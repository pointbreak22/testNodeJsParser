const express = require('express');
const CheckServiceCore = require('../Service/CheckServiceCore');
const router = express.Router();

// POST /prefix1/post1
router.post('/check-file', async (req, res) => {
    const {type, base64} = req.body;
    try {
        console.log("запрос пришел");
        // Обработка данных
        if (!type || !base64) {
            return res.status(400).send('Данные отсутствуют');
        }

        let result = await CheckServiceCore.startCheck(base64, type);
        // Успешный ответ
        res.status(200).send(result);
    } catch (err) {
        console.error('Ошибка при обработке файла:', err.message);
        res.status(500).send({error: err.message || 'Произошла ошибка'});
    }
});

module.exports = router;