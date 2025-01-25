const CheckAgeTypeService = require('./CheckAgeTypeService');
const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkStandard(productDTOCells) {

    let edit;
    if (await CheckAgeTypeService.isBaby(productDTOCells) && !valueService.getObjectValue(productDTOCells.standardNumber)?.startsWith("ТР ТС 007")) {
        productDTOCells.standardNumber = 'ТР ТС 007/2011 “О ' +
            'безопасности продукции, предназначенной для детей и подростков”';
        cellStyleService.setEdit(productDTOCells.standardNumber)
        edit = productDTOCells.standardNumber.address + " значение изменено";
    } else if (!valueService.getObjectValue(productDTOCells.standardNumber)?.startsWith("ТР ТС 017")) {
        productDTOCells.standardNumber = 'ТР ТС 017/2011 “О ' +
            'безопасности продукции легкой промышленности”';
        cellStyleService.setEdit(productDTOCells.standardNumber)
        edit = productDTOCells.standardNumber.address + " значение изменено";
    }
    return {edit: edit};

}

module.exports = {checkStandard};