const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkColor(cellColor, colorData) {

    let error = ''

    let cellColorValue = valueService.getObjectValue(cellColor);
    if (cellColorValue == null) {
        cellStyleService.setError(cellColor);
        error = cellColor.address + ' -  пустое значение';
        return error;
    }
    if (colorData && colorData.length > 0) {
        const result = colorData.find(item => item.value === cellColorValue);
        if (result === undefined) {
            cellStyleService.setError(cellColor);
            error = cellColor.address + ' - значение отсутствует в базе данных цвета';
        }
    }
    return error;
}

module.exports = {checkColor};