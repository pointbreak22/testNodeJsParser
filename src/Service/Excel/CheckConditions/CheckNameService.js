const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

const OptionService = require('../OptionService');

const FormulaParser = require('fast-formula-parser');
const formula = require('formulajs');
const parser = new FormulaParser();

async function checkNameMore80(productDTOCells, transportDTO) {

    // console.log(transportDTO.options);

    if (OptionService.isDisable(transportDTO.options, "№1")) {
        return
    }

    let cellNameValue = valueService.getObjectValue(productDTOCells.name);
    if (cellNameValue == null || cellNameValue === "") {
        cellStyleService.setError(productDTOCells.name);
        transportDTO.errorService.addBug(productDTOCells.name.address + ' - пустое значение');
    }

    if (productDTOCells.name.value instanceof Object && productDTOCells.name.value.formula != null) {
        productDTOCells.name.value = {formula: productDTOCells.name.value.formula};

    }
    //   let myFormula = `CONCATENATE(${valueService.getObjectValue(productDTOCells.productView)}," ", ${valueService.getObjectValue(productDTOCells.trademark)}," ",${valueService.getObjectValue(productDTOCells.targetFloor)}," ",${valueService.getObjectValue(productDTOCells.articleType)}," ", ${valueService.getObjectValue(productDTOCells.articleValue)}, " цвет ", ${valueService.getObjectValue(productDTOCells.colorValue)}, " р. ", ${valueService.getObjectValue(productDTOCells.clothingSizeValue)})`;

    // const result = parser.parse(myFormula);
    const result = formula.CONCATENATE(`${valueService.getObjectValue(productDTOCells.productView)}," ", ${valueService.getObjectValue(productDTOCells.trademark)}," ",${valueService.getObjectValue(productDTOCells.targetFloor)}," ",${valueService.getObjectValue(productDTOCells.articleType)}," ", ${valueService.getObjectValue(productDTOCells.articleValue)}, " цвет ", ${valueService.getObjectValue(productDTOCells.colorValue)}, " р. ", ${valueService.getObjectValue(productDTOCells.clothingSizeValue)}`);

    if (cellNameValue !== result) {
        cellStyleService.setError(productDTOCells.name);
        transportDTO.errorService.addBug(productDTOCells.name.address + " - значение не соответствует формуле");
    }

    let newCellNameValue = valueService.getObjectValue(productDTOCells.name)
    if (typeof newCellNameValue === 'string' && newCellNameValue.length > 80) {
        cellStyleService.setError(productDTOCells.name);
        transportDTO.errorService.addBug(productDTOCells.name.address + ' - количество символов больше 80');
    }
}

module.exports = {checkNameMore80};