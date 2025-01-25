const valueService = require('../ValueService');

async function isBaby(productDTOCells) {
    return !!(valueService.getObjectValue(productDTOCells.targetFloor)?.toLowerCase().startsWith('дет') ||
        valueService.getObjectValue(productDTOCells.standardNumber)?.startsWith('ТР ТС 007') ||
        valueService.getObjectValue(productDTOCells.clothingSizeType)?.toUpperCase() === "РОСТ"
        || (valueService.getObjectValue(productDTOCells.clothingSizeType)?.toUpperCase() === "РОССИЯ" &&
            valueService.getObjectValue(productDTOCells.clothingSizeValue) > 24 && valueService.getObjectValue(productDTOCells.clothingSizeValue) < 38));

}

module.exports = {
    isBaby
};