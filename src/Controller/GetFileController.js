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

        // console.log(options);
        //
        // res.status(200).send(options);
        //
        // return;
        let transportDTO = {
            errorService: new ErrorService(),
            options: options
        }

        // Обработка данных
        if (!type || !base64) {
            return res.status(200).send('Данные отсутствуют');
        }
        let newBase64 = await CheckServiceCore.startCheck(base64, type, transportDTO);
        let result = transportDTO.errorService.getErrors();
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