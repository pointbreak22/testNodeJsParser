const ExcelJS = require('exceljs');
const streamifier = require('streamifier');

async function checkMore80Symbol(base64String, sheetName) {
    if (!base64String || typeof base64String !== 'string') {
        throw new Error('Invalid Base64 string');
    }

    const buffer = Buffer.from(base64String, 'base64');
    const stream = streamifier.createReadStream(buffer);

    const workbook = new ExcelJS.Workbook();
    try {
        // Загружаем поток в Workbook
        await workbook.xlsx.read(stream);

        // Получаем нужный лист
        const sheet = workbook.getWorksheet(sheetName);



        if (!sheet) {
            throw new Error(`Sheet "${sheetName}" not found`);
        }
        const fillOrange = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFA500' }, // Оранжевый цвет
        };

        // Перебираем строки, начиная с первой
        sheet.eachRow((row, rowNumber) => {
            // Начинаем с 8-й строки
            if (rowNumber < 8) return;
            const cell = row.getCell(2); // Получаем ячейку столбца B (столбец 2)


            if (cell.value && getObjectValue(cell.value) !=null && getObjectValue(cell.value).length>50) { // Проверяем, есть ли значение в ячейке

              //  console.log(cell.value);

                cell.style = {
                    ...(cell.style || {}),
                    fill: fillOrange,
                };
            }
        });
        // sheet.getCell('B30').style = {
        //     ...(sheet.getCell('B30').style || {}),
        //     fill: fillRed
        // };



        // Конвертируем Workbook обратно в Base64
        const updatedBuffer = await workbook.xlsx.writeBuffer();
        const updatedBase64 = updatedBuffer.toString('base64');

        return updatedBase64;

    } catch (error) {
        console.error('Ошибка при обработке файла:', error.message);
        throw error;
    }
}
function getObjectValue(variable) {
    if (variable instanceof Object) {
        return variable.result ?? null;
    } else {
        return variable ?? null;
    }
}

module.exports={
    checkMore80Symbol,
}