const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkCellCount(cellCount) {
    let cellCountValue = valueService.getObjectValue(cellCount);
    if (cellCountValue == null || (typeof cellCountValue === 'string' && isNaN(Number(cellCountValue)))) {
        cellStyleService.setError(cellCount);
    }
}

module.exports = {checkCellCount};