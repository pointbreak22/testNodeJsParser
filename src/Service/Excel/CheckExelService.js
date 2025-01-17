const ExcelJS = require("exceljs");
const {Readable} = require('stream');
const CreateServiceDTO = require("./CreateDTOService");
const CheckNameService = require("./CheckConditions/CheckNameService");
const CheckModelService = require("./CheckConditions/CheckArticleService");
const CheckCountService = require("./CheckConditions/CheckCountService");
const CheckGenderService = require("./CheckConditions/CheckGenderService");
const CheckTradeMarkService = require("./CheckConditions/CheckTradeMarkService");
const CheckColorService = require("./CheckConditions/CheckColorService");
const CheckSizeAdultService = require("./CheckConditions/CheckSizeAdultService");

const MySqlCoreService = require("../MySql/MySqlCoreService");

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
        const rowPromises = []; // Массив для хранения всех промисов

        // Перебираем строки, начиная с первой
        sheet.eachRow((row, rowNumber) => {
            //   Начинаем с 8-й строки
            if (rowNumber < 8) return;
            rowPromises.push((async () => {
                let productDTO = CreateServiceDTO.getProductDTO(row);
                return await validatingChecks(productDTO, dbData);
            })());
        });
        // Конвертируем Workbook обратно в Base64
        return await workbook.xlsx.writeBuffer();
    } catch (error) {
        console.error('Ошибка при обработке файла:', error.message);
        throw error;
    }

}

async function validatingChecks(productDTO, dbData) {

    const errors = [];
    const successResults = [];

    try {
        const promises = [
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
        const results = await Promise.allSettled(promises.map(p => p.promise));

        results.forEach((result, index) => {
            const promiseMeta = promises[index]; // Получаем соответствующее имя из исходного массива
            if (result.status === "rejected") {
                errors.push({
                    name: promiseMeta.name, // Название метода
                    error: result.reason,   // Ошибка
                });
            } else {
                successResults.push(
                    result.value    // Успешный результат
                );
            }
        });

        return {
            successResults: successResults,
            errors: errors
        };

    } catch (error) {
        return {
            successResults: "Ошибка",
            errors: errors.message,
        };

    }
}

module.exports = {runExelCheck};

