const express = require('express');
const CheckServiceCore = require('../Service/CheckServiceCore');
const router = express.Router();

// POST /prefix1/post1
router.post('/check-file', async (req, res) => {
    const {type, base64} = req.body;
    console.log("запрос пришел");
    // Обработка данных
    if (!type || !base64) {
        return res.status(400).send('Данные отсутствуют');
    }

    let newBase24 = await CheckServiceCore.startCheck(base64, "Одежда");

    const obj = {
        result: "some value",
        base24: newBase24
    };

    // Успешный ответ
    res.status(200).send(obj);
});

module.exports = router;