const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkColor(cellColor, colorData) {

    let cellColorValue = valueService.getObjectValue(cellColor);
    if (cellColorValue == null) {
        cellStyleService.setError(cellColor);
        return;
    }
    if (colorData && colorData.length > 0) {
        const result = colorData.find(item => item.value === cellColorValue);
        if (result === undefined) {
            cellStyleService.setError(cellColor);
        }
    }
}

module.exports = {checkColor};