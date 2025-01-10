const ExcelJS = require('exceljs');
const ProductDTO = require('../../DTO/ProductDTO')
// const fileType = require('file-type');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const streamifier = require('streamifier');


async function processLargeExcelFromBase64UseDTO(base64String, sheetName) {
    try {
        // Преобразование Base64 в буфер
        const fileBuffer = Buffer.from(base64String, 'base64');

        // Превращаем буфер в поток
        const stream = streamifier.createReadStream(fileBuffer);


        // Создание "виртуального" ридера для работы с буфером
        const workbook = new ExcelJS.stream.xlsx.WorkbookReader(stream,//outputExcelFilePath,
            {
                entries: 'emit', // Генерация событий для каждой части
                sharedStrings: 'cache', // Кэширование sharedStrings
                styles: 'cache', // Кэширование стилей
            }
        );

        for await (const worksheet of workbook) {
            if (worksheet.name === sheetName) {  //проверка на нужную страницу
                let rowCount = 0;

                let arrProductDTO = []; //массив куда будет сохраняться DTO
                for await (const row of worksheet) {
                    // Пропускаем строки до 8-й
                    if (row.number < 8) {
                        continue;
                    }

                    const rowValues = row.values.slice(1); // Убираем первую пустую ячейку
                    const productDTO = new ProductDTO()
                    productDTO.code = getObjectValue(rowValues[0]);
                    productDTO.name = getObjectValue(rowValues[1]);
                    productDTO.trademark = getObjectValue(rowValues[2]);
                    productDTO.articleType = getObjectValue(rowValues[3]);
                    productDTO.articleValue = getObjectValue(rowValues[4]);
                    productDTO.productValue = getObjectValue(rowValues[5]);
                    productDTO.colorValue = getObjectValue(rowValues[6]);
                    productDTO.targetFloor = getObjectValue(rowValues[7]);
                    productDTO.clothingSizeType = getObjectValue(rowValues[8]);
                    productDTO.clothingSizeValue = getObjectValue(rowValues[9]);
                    productDTO.composition = getObjectValue(rowValues[10]);
                    productDTO.code2 = getObjectValue(rowValues[11]);
                    productDTO.standardNumber = getObjectValue(rowValues[12]);
                    productDTO.city = getObjectValue(rowValues[13]);
                    productDTO.count = getObjectValue(rowValues[14]);

                    arrProductDTO.push(productDTO);  // Добавляем DTO


                    // Логика обработки строки
                    rowCount++;
                    if (rowCount >= 1000) {
                        console.log("Достигнуто ограничение в 1000 строк. Завершаем обработку.");
                        break;
                    }
                }

                return arrProductDTO; // Выход после обработки одного листа
            }
        }

        console.log(`Лист с именем "${sheetName}" не найден.`);
    } catch (error) {
        console.error('Ошибка при обработке файла:', error.message);
    }
}

async function processLargeExcelFromBase64(base64String, sheetName) {
    try {
        // Преобразование Base64 в буфер
        const fileBuffer = Buffer.from(base64String, 'base64');

        // Проверка типа файла
        // const fileType = await fileTypeFromBuffer(fileBuffer);


        //
        // if (!fileType || fileType.ext !== 'xlsx') {
        //     throw new Error('Файл не является корректным Excel (.xlsx) файлом.');
        // }
        //
        // console.log(`Файл проверен: ${fileType.mime} (${fileType.ext})`);

        // Создание "виртуального" ридера для работы с буфером
        const workbook = new ExcelJS.stream.xlsx.WorkbookReader(fileBuffer, {
            entries: 'emit', // Генерация событий для каждой части
            sharedStrings: 'cache', // Кэширование sharedStrings
            styles: 'cache', // Кэширование стилей
        });

        console.log("work");
        return;

        for await (const worksheet of workbook) {
            if (worksheet.name === sheetName) {
                console.log(`Обрабатываем лист: ${worksheet.name}`);
                let rowCount = 0;

                for await (const row of worksheet) {
                    const rowValues = row.values.slice(1); // Убираем первую пустую ячейку
                    console.log(`Строка ${row.number}:`, rowValues);

                    // Логика обработки строки
                    rowCount++;
                    if (rowCount >= 1000) {
                        console.log("Достигнуто ограничение в 1000 строк. Завершаем обработку.");
                        break;
                    }
                }

                return; // Выход после обработки одного листа
            }
        }

        console.log(`Лист с именем "${sheetName}" не найден.`);

    } catch (error) {
        console.error('Ошибка при обработке файла:', error.message);
    }
}


async function processLargeExcelSheetUseDTO(filePath, sheetName) {
    const workbook = new ExcelJS.stream.xlsx.WorkbookReader(filePath, {
        entries: 'emit', // Генерация событий для каждой части
        sharedStrings: 'cache', // Кэширование sharedStrings
        styles: 'cache', // Кэширование стилей
    });

    for await (const worksheet of workbook) {
        if (worksheet.name === sheetName) {
            //     console.log(`Обрабатываем лист: ${worksheet.name}`);
            let rowCount = 0;

            let arrProductDTO = [];
            for await (const row of worksheet) {
                // Пропускаем строки до 8-й
                if (row.number < 8) {
                    continue;
                }


                const rowValues = row.values.slice(1); // Убираем первую пустую ячейку
                const productDTO = new ProductDTO()
                productDTO.code = getObjectValue(rowValues[0]);
                productDTO.name = getObjectValue(rowValues[1]);
                productDTO.trademark = getObjectValue(rowValues[2]);
                productDTO.articleType = getObjectValue(rowValues[3]);
                productDTO.articleValue = getObjectValue(rowValues[4]);
                productDTO.productValue = getObjectValue(rowValues[5]);
                productDTO.colorValue = getObjectValue(rowValues[6]);
                productDTO.targetFloor = getObjectValue(rowValues[7]);
                productDTO.clothingSizeType = getObjectValue(rowValues[8]);
                productDTO.clothingSizeValue = getObjectValue(rowValues[9]);
                productDTO.composition = getObjectValue(rowValues[10]);
                productDTO.code2 = getObjectValue(rowValues[11]);
                productDTO.standardNumber = getObjectValue(rowValues[12]);
                productDTO.city = getObjectValue(rowValues[13]);
                productDTO.count = getObjectValue(rowValues[14]);

                arrProductDTO.push(productDTO);
                //console.log(`Строка ${row.number}:`, rowValues);

                // Логика обработки строки
                rowCount++;
                if (rowCount >= 1000) {
                    console.log("Достигнуто ограничение в 1000 строк. Завершаем обработку.");
                    break;
                }
            }

            return arrProductDTO; // Выход после обработки одного листа
        }
    }

    console.log(`Лист с именем "${sheetName}" не найден.`);
}

function getObjectValue(variable) {
    if (variable instanceof Object) {
        return variable.result ?? null;
    } else {
        return variable ?? null;
    }
}

async function processLargeExcelSheet(filePath, sheetName) {
    const workbook = new ExcelJS.stream.xlsx.WorkbookReader(filePath, {
        entries: 'emit', // Генерация событий для каждой части
        sharedStrings: 'cache', // Кэширование sharedStrings
        styles: 'cache', // Кэширование стилей
    });

    for await (const worksheet of workbook) {
        if (worksheet.name === sheetName) {
            console.log(`Обрабатываем лист: ${worksheet.name}`);
            let rowCount = 0;

            for await (const row of worksheet) {
                const rowValues = row.values.slice(1); // Убираем первую пустую ячейку
                console.log(`Строка ${row.number}:`, rowValues);

                // Логика обработки строки
                rowCount++;
                if (rowCount >= 1000) {
                    console.log("Достигнуто ограничение в 1000 строк. Завершаем обработку.");
                    break;
                }
            }

            return; // Выход после обработки одного листа
        }
    }

    console.log(`Лист с именем "${sheetName}" не найден.`);
}

async function processLargeExcel(filePath) {
    const workbook = new ExcelJS.stream.xlsx.WorkbookReader(filePath, {
        entries: 'emit', // Генерация событий для каждой части
        sharedStrings: 'cache', // Кэширование sharedStrings
        styles: 'cache', // Кэширование стилей
    });

    for await (const worksheet of workbook) {
        console.log(`Обрабатываем лист: ${worksheet.name}`);

        for await (const row of worksheet) {
            const rowValues = row.values.slice(1); // Убираем пустой первый элемент
            console.log(rowValues);

            // Логика обработки строки
            if (row.number >= 1000) {
                console.log("Обработано 1000 строк, остановка.");
                break;
            }
        }
    }

    console.log('Обработка завершена.');
}

module.exports = {
    processLargeExcelFromBase64UseDTO,
    processLargeExcelFromBase64,
    processLargeExcel,
    processLargeExcelSheet,
    processLargeExcelSheetUseDTO
};