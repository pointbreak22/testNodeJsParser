//const {randomDelay}=require('./module/myModule');

// const ProductDTO=require('./DTO/ProductDTO')
//
//
// const productDTO=new ProductDTO()
//
//
//
// let myCode=productDTO.code;
// productDTO.code=123;
//
// let myName=productDTO.name;
// productDTO.name="MyName";





//cчитывание файла
const readFileService=require('./Services/Exel/readFileExel');
const path = require('path');
// // Получение пути к файлу относительно корня проекта
const fileExel= path.join(process.cwd(), 'Public/testFileExel.xlsx');
readFileService.processLargeExcelSheetUseDTO(fileExel, "Одежда").then(result => console.log(result[0].name));








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











