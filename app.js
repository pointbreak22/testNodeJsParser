const express = require('express');
const bodyParser = require('body-parser');
const getFileRoutes = require('./src/Controller/GetFileController');


const app = express();
const port = 3000;

// Middleware для обработки JSON
app.use(bodyParser.json());

// Подключение маршрутов с разными префиксами
app.use(getFileRoutes);

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
























