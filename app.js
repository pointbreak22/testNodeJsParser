//const {randomDelay}=require('./module/myModule');



require('./Services/MySql/MySqlCoreService')

return;
const fs = require('fs');
const path = require('path');
const readFileService=require('./Services/Exel/readFileExel');



// //cчитывание файла

// // Получение пути к файлу относительно корня проекта
// const fileExel= path.join(process.cwd(), 'Public/restored_example.xlsx');
// readFileService.processLargeExcelSheetUseDTO(fileExel, "Одежда").then(result => console.log(result[0].name));



const base64FilePath = path.join(process.cwd(), 'Public/testFile.txt'); // Путь к файлу со строкой Base64
// // Чтение строки Base64
const base64String = fs.readFileSync(base64FilePath, 'utf8'); //
//
// //readFileService.processLargeExcelSheetUseDTO(fileExel, "Одежда").then(result => console.log(result[0].name));
readFileService.processLargeExcelFromBase64UseDTO(base64String, "Одежда").then(result => console.log(result[0].name));
readFileService.processLargeExcelFromBase64UseDTO(base64String, "Одежда").then(result => console.log(result[0].name));
readFileService.processLargeExcelFromBase64UseDTO(base64String, "Одежда").then(result => console.log(result[0].name));

//



//
// async function convertExcelToBase64(inputFilePath, outputFilePath) {
//     try {
//         // Чтение файла в виде буфера
//         const fileBuffer = fs.readFileSync(inputFilePath);
//
//         // Конвертация буфера в строку Base64
//         const base64String = fileBuffer.toString('base64');
//
//         // Запись строки Base64 в текстовый файл
//         fs.writeFileSync(outputFilePath, base64String, 'utf8');
//         console.log(`Файл успешно конвертирован в Base64 и сохранён в: ${outputFilePath}`);
//     } catch (error) {
//         console.error('Ошибка при конвертации файла:', error.message);
//     }
// }
//
// // Пример использования
// const excelFilePath = path.join(process.cwd(), 'Public/testFileExel.xlsx'); // Путь к входному Excel файлу
// const outputBase64FilePath = path.join(process.cwd(), 'Public/testFile.txt'); // Путь для сохранения строки Base64
//
// convertExcelToBase64(excelFilePath, outputBase64FilePath);
//


// Функция для конвертации Base64 строки в файл Excel
// async function convertBase64ToExcel(inputBase64FilePath, outputExcelFilePath) {
//     try {
//         // Чтение строки Base64 из текстового файла
//         const base64String = fs.readFileSync(inputBase64FilePath, 'utf8');
//
//         // Конвертация строки Base64 в буфер
//         const fileBuffer = Buffer.from(base64String, 'base64');
//
//         // Запись буфера в файл Excel
//         fs.writeFileSync(outputExcelFilePath, fileBuffer);
//         console.log(`Файл успешно восстановлен из Base64 и сохранён в: ${outputExcelFilePath}`);
//     } catch (error) {
//         console.error('Ошибка при восстановлении файла:', error.message);
//     }
// }
//
// // Пример использования
// const inputBase64FilePath = path.join(process.cwd(), 'Public/testFile.txt');  // Путь к файлу со строкой Base64
// const outputExcelFilePath =path.join(process.cwd(), 'Public/restored_example.xlsx'); // Путь для сохранения Excel файла
//
// convertBase64ToExcel(inputBase64FilePath, outputExcelFilePath);
//






// const express = require('express');
// const bodyParser = require('body-parser');
// const firstRoutes = require('./Controllers/FirstController'); // Первый контроллер
// const secondRoutes = require('./Controllers/SecondController'); // Второй контроллер
//
//
// const app = express();
// const port = 3000;
//
// // Middleware для обработки JSON
// app.use(bodyParser.json());
//
// // Подключение маршрутов с разными префиксами
// app.use('/prefix1', firstRoutes); // Первый контроллер
// app.use('/prefix2', secondRoutes); // Второй контроллер
//
// // Запуск сервера
// app.listen(port, () => {
//     console.log(`Сервер запущен на http://localhost:${port}`);
// });











