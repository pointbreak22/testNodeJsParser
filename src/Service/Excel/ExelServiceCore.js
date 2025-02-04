const ExcelJS = require("exceljs");
const CheckServiceCore = require("./CheckServiceCore");
const MySqlCoreService = require("../MySql/MySqlCoreService");
const dotenv = require('dotenv')
dotenv.config()

const configItems = require('../../../config.json').Items;

const MAX_BATCH_SIZE = process.env.MAX_BATCH_SIZE || 10; // Максимальное количество одновременно выполняемых Promises

async function runExelCheck(stream, type, transportDTO) {
    const workbook = await new ExcelJS.Workbook();
    try {
        // Загружаем поток в Workbook
        await workbook.xlsx.read(stream);
        let configType = getConfigByType(type)

        // Получаем нужный лист
        const sheetPage = await workbook.getWorksheet(configType);
        if (!sheetPage || configType !== "Одежда") {
            throw new Error(`Не найден лист ${configType}`);
        }

        const dbData = await MySqlCoreService.fetchData();  // Получаем данные db
        const rows = [];

        // Перебираем строки, начиная с первой
        sheetPage.eachRow((row, rowNumber) => {
            if (rowNumber >= 8) {
                rows.push(row);
            }
        });

        // Функция для обработки батча
        const processBatch = async (batch) => {
            const promises = batch.map(async (row) => {
                return validatingChecks(row, dbData, type, transportDTO);
            });
            // Ждём завершения всех промесив в текущем батче
            return Promise.allSettled(promises);
        };

        // Разбиваем строки на батчи
        for (let i = 0; i < rows.length; i += MAX_BATCH_SIZE) {
            const batch = rows.slice(i, i + MAX_BATCH_SIZE);
            const results = await processBatch(batch);

            // Обработка результатов текущего батча
            results.forEach((result, rowIndex) => {
                if (result.status === "fulfilled") {

                } else {
                    transportDTO.errorService.addError(result.reason);
                }
            });
        }
        return await workbook.xlsx.writeBuffer();

    } catch (error) {
        throw error;
    }
}

async function validatingChecks(row, dbData, type, transportDTO) {

    try {
        const checks = CheckServiceCore(row, dbData, transportDTO)[type]();
        // Запускаем Promise.allSettled
        const results = await Promise.allSettled(checks.map(checks => checks.promise));
        results.forEach((result, index) => {
            const check = checks[index]; // Получаем соответствующее имя из исходного массива
            if (result.status === "fulfilled") {
            } else {
                transportDTO.errorService.addError(`${check.name}: ${result.reason}`); // Ошибки
            }
        });

    } catch (error) {
        transportDTO.errorService.addError(error.message || 'Unknown error');
    }
}

function getConfigByType(type) {
    if (configItems[type]) {
        return configItems[type]; // Возвращаем объект для данного типа
    } else {
        throw new Error(`Тип "${type}" не найден в конфигурации`);
    }
}

module.exports = {runExelCheck};

