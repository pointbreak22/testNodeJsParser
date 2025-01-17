const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkNameMore80(cellName) {

    let error

    let cellNameValue = valueService.getObjectValue(cellName);
    if (cellNameValue == null || (typeof cellNameValue === 'string' && cellNameValue.length > 80)) {
        cellStyleService.setError(cellName);
        error = cellName.address + ' - пустое значение';
    } else if (typeof cellNameValue === 'string' && cellNameValue.length > 80) {
        cellStyleService.setError(cellName);
        error = cellName.address + ' - количество символов больше 80';
    }
    return error;
}

module.exports = {checkNameMore80};