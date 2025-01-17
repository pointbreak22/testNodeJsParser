const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkNameMore80(cellName) {

    let error

    let cellNameValue = valueService.getObjectValue(cellName);
    if (cellNameValue == null || (typeof cellNameValue === 'string' && cellNameValue.length > 50)) {
        cellStyleService.setError(cellName);
        error = cellName.address + ' - пустое значение';
    }
    return error;
}

module.exports = {checkNameMore80};