const express = require('express');
const router = express.Router();

// POST /prefix1/post1
router.post('/post1', (req, res) => {
    const { name, age } = req.body;

    // Обработка данных
    if (!name || !age) {
        return res.status(400).send('Имя и возраст обязательны');
    }

    // Успешный ответ
    res.status(200).send(`Привет, ${name}! Тебе ${age} лет.`);
});

// POST /prefix1/post2
router.post('/post2', (req, res) => {
    const { email } = req.body;

    // Простая проверка
    if (!email) {
        return res.status(400).send('Email обязателен');
    }

    // Успешный ответ
    res.status(200).send(`Спасибо за отправку email: ${email}`);
});

module.exports = router;