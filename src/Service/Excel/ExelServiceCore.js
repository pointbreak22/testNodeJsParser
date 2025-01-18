const ExcelJS = require("exceljs");
const CheckServiceCore = require("./CheckServiceCore");
const MySqlCoreService = require("../MySql/MySqlCoreService");
const dotenv = require('dotenv')
dotenv.config()

const config = require('../../../config.json');

const MAX_BATCH_SIZE = process.env.MAX_BATCH_SIZE || 10; // Максимальное количество одновременно выполняемых Promises

async function runExelCheck(stream, type) {
    const workbook = await new ExcelJS.Workbook();
    try {
        // Загружаем поток в Workbook
        await workbook.xlsx.read(stream);

        let configType = getConfigByType(type)
        // Получаем нужный лист
        const sheet = await workbook.getWorksheet(configType.tablePage);
        if (!sheet) {
            throw new Error(`Sheet "${configType.tablePage}" not found`);
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
                return validatingChecks(row, dbData, type);
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

async function validatingChecks(row, dbData, type) {

    const errors = [];
    const successResults = [];
    try {
        const checks = CheckServiceCore(row, dbData)[type]();
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

function getConfigByType(type) {
    const items = config.Items; // Извлекаем объект Items из конфига

    if (items[type]) {
        return items[type]; // Возвращаем объект для данного типа
    } else {
        throw new Error(`Тип "${type}" не найден в конфигурации`);
    }
}

module.exports = {runExelCheck};

