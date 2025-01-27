const CheckAgeTypeService = require('./CheckAgeTypeService');
const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkStandard(productDTOCells, isBaby) {

    let edit;

    let standardNumberValue = valueService.getObjectValue(productDTOCells.standardNumber);

//    console.log(standardNumberValue);

    if (isBaby) {
        if (standardNumberValue == null || !standardNumberValue.startsWith("ТР ТС 007")) {
            productDTOCells.standardNumber.value = 'ТР ТС 007/2011 “О ' +
                'безопасности продукции, предназначенной для детей и подростков”';
            cellStyleService.setEdit(productDTOCells.standardNumber)
            edit = productDTOCells.standardNumber.address + " значение изменено";

        }

    } else if (!isBaby) {
        if (standardNumberValue == null || !standardNumberValue.startsWith("ТР ТС 017")) {
            productDTOCells.standardNumber.value = 'ТР ТС 017/2011 “О ' +
                'безопасности продукции легкой промышленности”';
            cellStyleService.setEdit(productDTOCells.standardNumber)
            edit = productDTOCells.standardNumber.address + " значение изменено";
        }
    }

    return {edit: edit};

}

module.exports = {checkStandard};