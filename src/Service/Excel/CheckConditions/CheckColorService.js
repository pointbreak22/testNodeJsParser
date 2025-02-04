const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');
// const transportDTO.errorService = require('../transportDTO.errorService');

const dotenv = require('dotenv')
dotenv.config()

const USE_COMMENTS = process.env.USE_COMMENTS;

async function checkColor(cellColor, colorData, transportDTO) {
    let cellColorValue = valueService.getObjectValue(cellColor);
    if (cellColorValue == null) {
        cellStyleService.setError(cellColor);
        transportDTO.errorService.addBug(cellColor.address + ' -  пустое значение');
        return;
    }
    if (colorData && colorData.length > 0) {
        const result = colorData.find(item => valueService.compareStrings(item.value, cellColorValue));
        if (result === undefined) {
            cellStyleService.setError(cellColor);
            transportDTO.errorService.addBug(cellColor.address + ' - значение отсутствует в бд "colors"');
            if (USE_COMMENTS === true) {
                cellColor.note = cellColor.address + ' - значение отсутствует в бд таблицы "colors"';
            }
        }
    }
}

module.exports = {checkColor};