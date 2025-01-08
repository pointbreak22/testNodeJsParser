const ExcelJS = require('exceljs');

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
    processLargeExcel,
    processLargeExcelSheet,
};