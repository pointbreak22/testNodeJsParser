const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');
const {getObjectValue} = require("../ValueService");

async function checkNameMore80(productDTOCells) {

    let error;
    let edit;

    let cellNameValue = valueService.getObjectValue(productDTOCells.name);
    if (cellNameValue == null || cellNameValue === "") {
        cellStyleService.setError(productDTOCells.name);
        error = productDTOCells.name.address + ' - пустое значение';
    }

    let formulaExel = "";
    if (productDTOCells.name.value instanceof Object && productDTOCells.name.value.formula != null) {
        formulaExel = productDTOCells.name.value.formula;
    }

    let myFormula = `CONCATENATE(${productDTOCells.productView.address}," ", ${productDTOCells.trademark.address}," ",${productDTOCells.targetFloor.address}," ",${productDTOCells.articleType.address}," ", ${productDTOCells.articleValue.address}, " цвет ", ${productDTOCells.colorValue.address}, " р. ", ${productDTOCells.clothingSizeValue.address})`;

    if (formulaExel !== myFormula) {

        cellStyleService.setEdit(productDTOCells.name);
        edit = productDTOCells.name.address + " значение изменено";
    }

    productDTOCells.name.value = {formula: myFormula};

    let newCellNameValue = valueService.getObjectValue(productDTOCells.name)
    if (typeof newCellNameValue === 'string' && newCellNameValue.length > 80) {
        cellStyleService.setError(productDTOCells.name);
        error = productDTOCells.name.address + ' - количество символов больше 80';
    }

    return {error: error, edit: edit};
}

module.exports = {checkNameMore80};