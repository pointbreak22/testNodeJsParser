const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');
const ErrorService = require('../ErrorService');

async function checkCellCount(cellCount) {
    let cellCountValue = valueService.getObjectValue(cellCount);
    if (cellCountValue == null || (typeof cellCountValue === 'string' && isNaN(Number(cellCountValue)))) {
        cellStyleService.setError(cellCount);
        ErrorService.addBug(cellCount.address + ' -  пустое значение или не число');
    }
}

module.exports = {checkCellCount};