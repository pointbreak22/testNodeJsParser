const ExcelJS = require("exceljs");
const CreateServiceDTO = require("./CreateDTOService");
const CheckNameService = require("./CheckConditions/CheckNameService");
const CheckModelService = require("./CheckConditions/CheckArticleService");
const CheckCountService = require("./CheckConditions/CheckCountService");
const CheckGenderService = require("./CheckConditions/CheckGenderService");
const CheckTradeMarkService = require("./CheckConditions/CheckTradeMarkService");
const CheckColorService = require("./CheckConditions/CheckColorService");
const CheckSizeAdultService = require("./CheckConditions/CheckSizeAdultService");

const MySqlCoreService = require("../MySql/MySqlCoreService");
const dotenv = require('dotenv')
dotenv.config()

const MAX_BATCH_SIZE = process.env.MAX_BATCH_SIZE || 10; // Максимальное количество одновременно выполняемых Promises

async function runExelCheck(stream, sheetName) {
    const workbook = await new ExcelJS.Workbook();
    try {
        // Загружаем поток в Workbook
        await workbook.xlsx.read(stream);
        // Получаем нужный лист
        const sheet = await workbook.getWorksheet(sheetName);
        if (!sheet) {
            throw new Error(`Sheet "${sheetName}" not found`);
        }
        const dbData = await MySqlCoreService.fetchData();  // Получаем данные

        const rows = [];
        let bugs = [];
        let errors = [];

        // Перебираем строки, начиная с первой
        sheet.eachRow((row, rowNumber) => {
            if (rowNumber >= 8) {
                rows.push(row);
            }
        });

        // Функция для обработки батча
        const processBatch = async (batch) => {
            const promises = batch.map(async (row) => {
                const productDTO = CreateServiceDTO.getProductDTO(row);
                return validatingChecks(productDTO, dbData);
            });

            // Ждём завершения всех промисов в текущем батче
            return Promise.allSettled(promises);
        };

        // Разбиваем строки на батчи
        for (let i = 0; i < rows.length; i += MAX_BATCH_SIZE) {
            const batch = rows.slice(i, i + MAX_BATCH_SIZE);
            const results = await processBatch(batch);

            // Обработка результатов текущего батча
            results.forEach((result, rowIndex) => {
                if (result.status === "fulfilled") {
                    bugs.push(...result.value.successResults);
                    errors.push(...result.value.errors);
                } else {
                    errors.push(result.reason);
                }
            });
        }

        bugs = [...new Set(bugs)];
        errors = [...new Set(errors)];

        let buffer = await workbook.xlsx.writeBuffer();
        return {
            buffer: buffer,
            bugs: bugs,
            errors: errors,
        };
    } catch (error) {
        console.error('Ошибка при обработке файла:', error.message);
        throw error;
    }
}

async function validatingChecks(productDTO, dbData) {

    const errors = [];
    const successResults = [];

    try {
        const checks = [
            {name: "№1", promise: CheckNameService.checkNameMore80(productDTO.name)},
            {
                name: "№2",
                promise: CheckTradeMarkService.checkTradeMarks(productDTO.trademark, dbData.banedTradeMarkData)
            },
            {name: "№3", promise: CheckModelService.checkTypeArticle(productDTO.articleType)},
            {name: "№4", promise: CheckModelService.checkValueArticle(productDTO)},
            {name: "№6", promise: CheckColorService.checkColor(productDTO.colorValue, dbData.colorsDataResult)},
            {name: "№7", promise: CheckGenderService.checkGender(productDTO.targetFloor, dbData.genderData)},
            {name: "№8", promise: CheckSizeAdultService.checkSizeAdults(productDTO, dbData.sizesDataResult)},
            {name: "№13", promise: CheckCountService.checkCellCount(productDTO.count)},
        ];

        // Запускаем Promise.allSettled
        const results = await Promise.allSettled(checks.map(checks => checks.promise));

        results.forEach((result, index) => {
            const check = checks[index]; // Получаем соответствующее имя из исходного массива
            if (result.status === "fulfilled") {
                if (result.value != null && result.value !== '') {
                    successResults.push(result.value); // Успешные результаты
                }
            } else {
                errors.push(`${check.name}: ${result.reason}`); // Ошибки
            }
        });
        return {
            successResults: successResults,
            errors: errors
        };

    } catch (error) {
        return {
            successResults: [],
            errors: [error.message || 'Unknown error'],
        };
    }
}

module.exports = {runExelCheck};

