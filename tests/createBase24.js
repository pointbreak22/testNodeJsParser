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


const oldExcelFilePath = path.join(process.cwd(), 'Public/testFileExel.xlsx'); // Путь для сохранения Excel файла
const Base64FilePath = path.join(process.cwd(), 'Public/testFile.txt');  // Путь к файлу со строкой Base64

convertExcelToBase64(oldExcelFilePath, Base64FilePath);