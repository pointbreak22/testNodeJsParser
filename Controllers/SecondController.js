const express = require('express');
const router = express.Router();

// POST /prefix2/post1
router.post('/post1', (req, res) => {
    const { product, quantity } = req.body;

    // Обработка данных
    if (!product || !quantity) {
        return res.status(400).send('Продукт и количество обязательны');
    }

    // Успешный ответ
    res.status(200).send(`Вы заказали ${quantity} единиц продукта: ${product}`);
});

// POST /prefix2/post2
router.post('/post2', (req, res) => {
    const { feedback } = req.body;

    // Обработка данных
    if (!feedback) {
        return res.status(400).send('Обратная связь обязательна');
    }

    // Успешный ответ
    res.status(200).send('Спасибо за ваш отзыв!');
});

module.exports = router;