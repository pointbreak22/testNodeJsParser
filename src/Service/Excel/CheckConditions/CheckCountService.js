const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkCellCount(cellCount) {
    let error = '';
    let cellCountValue = valueService.getObjectValue(cellCount);
    if (cellCountValue == null || (typeof cellCountValue === 'string' && isNaN(Number(cellCountValue)))) {
        cellStyleService.setError(cellCount);
        error = cellCount.address + ' -  пустое значение или не число';
    }
    return error;
}

module.exports = {checkCellCount};