const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

const dotenv = require('dotenv')
dotenv.config()

const USE_COMMENTS = process.env.USE_COMMENTS;

async function checkColor(cellColor, colorData) {

    let error;

    let cellColorValue = valueService.getObjectValue(cellColor);
    if (cellColorValue == null) {
        cellStyleService.setError(cellColor);
        error = cellColor.address + ' -  пустое значение';
        //  cellColor.note = cellColor.address + ' -  пустое значение';
        return {error: error};
    }
    if (colorData && colorData.length > 0) {
        const result = colorData.find(item => item.value.toLowerCase() === cellColorValue.toLowerCase());
        if (result === undefined) {
            cellStyleService.setError(cellColor);
            error = cellColor.address + ' - значение отсутствует в бд "colors"';
            if (USE_COMMENTS === true) {
                cellColor.note = cellColor.address + ' - значение отсутствует в бд таблицы "colors"';
            }
        }
    }
    return {error: error};
}

module.exports = {checkColor};