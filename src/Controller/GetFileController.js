const express = require('express');
const router = express.Router();

// POST /prefix1/post1
router.post('/check-file', (req, res) => {
    const {type, base64} = req.body;
    console.log("запрос пришел");
    // Обработка данных
    if (!type || !base64) {
        return res.status(400).send('Данные отсутствуют');
    }
    const obj = {
        result: "some value",
        base24: base64
    };


    // Успешный ответ
    res.status(200).send(obj);
});

module.exports = router;