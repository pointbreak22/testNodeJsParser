const express = require('express');
const CheckServiceCore = require('../Service/CheckServiceCore');
const router = express.Router();

const ErrorService = require('../Service/Excel/ErrorService');

const configOptions = require('../../config.json').Options;

// POST /prefix
router.post('/check-file', async (req, res) => {
    const {type, base64, options} = req.body;
    try {
        console.log("запрос пришел");
        ErrorService.clearErrors();

        for (const key in options) {
            if (configOptions.hasOwnProperty(key)) {
                console.log("Найдена опция:" + key + " с параметром:" + configOptions[key]);
            } else {
                console.log("не айдена опция:" + key);
            }

        }

        //  console.log(options);

        // Обработка данных
        if (!type || !base64) {
            return res.status(200).send('Данные отсутствуют');
        }
        let newBase64 = await CheckServiceCore.startCheck(base64, type);
        let result = ErrorService.getErrors();
        result.base64 = newBase64;
        
        // let result = options;
        // Успешный ответ
        res.status(200).send(result);
    } catch (err) {
        console.error('Ошибка при обработке файла:', err.message);
        res.status(200).send({errors: [err.message || 'Произошла ошибка']});
    }
});

module.exports = router;