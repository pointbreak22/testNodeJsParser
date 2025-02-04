const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

// const ErrorService = require('../ErrorService');

async function checkCellCount(cellCount, transportDTO) {
    let cellCountValue = valueService.getObjectValue(cellCount);
    if (cellCountValue == null || (typeof cellCountValue === 'string' && isNaN(Number(cellCountValue)))) {
        cellStyleService.setError(cellCount);
        transportDTO.errorService.addBug(cellCount.address + ' -  пустое значение или не число');
    }
}

module.exports = {checkCellCount};