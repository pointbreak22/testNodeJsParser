const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');
const ErrorService = require('../ErrorService');

async function checkStandard(productDTOCells, isBaby) {

    let standardNumberValue = valueService.getObjectValue(productDTOCells.standardNumber);

    if (isBaby) {
        if (standardNumberValue == null || !standardNumberValue.startsWith("ТР ТС 007")) {
            productDTOCells.standardNumber.value = 'ТР ТС 007/2011 “О ' +
                'безопасности продукции, предназначенной для детей и подростков”';
            cellStyleService.setEdit(productDTOCells.standardNumber)
            ErrorService.addChange(productDTOCells.standardNumber.address + " значение изменено");

        }

    } else if (!isBaby) {
        if (standardNumberValue == null || !standardNumberValue.startsWith("ТР ТС 017")) {
            productDTOCells.standardNumber.value = 'ТР ТС 017/2011 “О ' +
                'безопасности продукции легкой промышленности”';
            cellStyleService.setEdit(productDTOCells.standardNumber)
            ErrorService.addChange(productDTOCells.standardNumber.address + " значение изменено");
        }
    }

}

module.exports = {checkStandard};