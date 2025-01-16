const express = require('express');
const bodyParser = require('body-parser');
const getFileRoutes = require('./src/Controller/GetFileController');


const app = express();
const port = 3000;

// Middleware для обработки JSON

// Настройка для увеличения максимального размера тела запроса (например, 50MB)
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));

// Подключение маршрутов с разными префиксами
app.use(getFileRoutes);

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
























