
const fs = require('fs');
const path = require('path');


async function convertExcelToBase64(inputFilePath, outputFilePath) {
    try {
        // Чтение файла в виде буфера
        const fileBuffer = fs.readFileSync(inputFilePath);

        // Конвертация буфера в строку Base64
        const base64String = fileBuffer.toString('base64');

        // Запись строки Base64 в текстовый файл
        fs.writeFileSync(outputFilePath, base64String, 'utf8');
        console.log(`Файл успешно конвертирован в Base64 и сохранён в: ${outputFilePath}`);
    } catch (error) {
        console.error('Ошибка при конвертации файла:', error.message);
    }
}



//Функция для конвертации Base64 строки в файл Excel

async function convertBase64ToExcel(inputBase64FilePath, outputExcelFilePath) {
    try {
        // Чтение строки Base64 из текстового файла
        const base64String = fs.readFileSync(inputBase64FilePath, 'utf8');

        // Конвертация строки Base64 в буфер
        const fileBuffer = Buffer.from(base64String, 'base64');

        // Запись буфера в файл Excel
        fs.writeFileSync(outputExcelFilePath, fileBuffer);
        console.log(`Файл успешно восстановлен из Base64 и сохранён в: ${outputExcelFilePath}`);
    } catch (error) {
        console.error('Ошибка при восстановлении файла:', error.message);
    }
}


module.exports={
    convertExcelToBase64,
    convertBase64ToExcel,
}