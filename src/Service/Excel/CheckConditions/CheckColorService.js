const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');
const ErrorService = require('../ErrorService');

const dotenv = require('dotenv')
dotenv.config()

const USE_COMMENTS = process.env.USE_COMMENTS;

async function checkColor(cellColor, colorData) {
    let cellColorValue = valueService.getObjectValue(cellColor);
    if (cellColorValue == null) {
        cellStyleService.setError(cellColor);
        ErrorService.addBug(cellColor.address + ' -  пустое значение');
        return;
    }
    if (colorData && colorData.length > 0) {
        const result = colorData.find(item => valueService.compareStrings(item.value, cellColorValue));
        if (result === undefined) {
            cellStyleService.setError(cellColor);
            ErrorService.addBug(cellColor.address + ' - значение отсутствует в бд "colors"');
            if (USE_COMMENTS === true) {
                cellColor.note = cellColor.address + ' - значение отсутствует в бд таблицы "colors"';
            }
        }
    }
}

module.exports = {checkColor};