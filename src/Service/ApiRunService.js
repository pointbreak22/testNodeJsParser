const express = require('express');
const bodyParser = require('body-parser');
const firstRoutes = require('../Controller/FirstController'); // Первый контроллер
const secondRoutes = require('../Controller/SecondController'); // Второй контроллер


const app = express();
const port = 3000;

// Middleware для обработки JSON
app.use(bodyParser.json());

// Подключение маршрутов с разными префиксами
app.use('/prefix1', firstRoutes); // Первый контроллер
app.use('/prefix2', secondRoutes); // Второй контроллер

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});