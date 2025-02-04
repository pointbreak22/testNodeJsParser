const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');
const ErrorService = require('../ErrorService');

async function checkTypeArticle(cellTypeModel) {
    const list = ['Модель', 'Артикул', 'Модель/Артикул', 'Модель / Артикул'];
    let typeModelValue = valueService.getObjectValue(cellTypeModel);
    if (typeModelValue == null || (typeof typeModelValue === 'string' && !list.includes(typeModelValue))) {
        cellStyleService.setError(cellTypeModel);
    }
}

async function checkValueArticle(productDTOCells) {

    const list = [
        valueService.getObjectValue(productDTOCells.productView),
        valueService.getObjectValue(productDTOCells.targetFloor),
        valueService.getObjectValue(productDTOCells.trademark),
        valueService.getObjectValue(productDTOCells.composition),
    ];
    let articleValue = valueService.getObjectValue(productDTOCells.articleValue);
    if (articleValue == null) {
        cellStyleService.setError(productDTOCells.articleValue)
        ErrorService.addBug(productDTOCells.articleValue.address + ' -  пустое значение');
    }

    for (let item of list) {
        if (item != null && valueService.normalizedIncludes(articleValue, item)) {
            cellStyleService.setError(productDTOCells.articleValue)
            ErrorService.addBug(productDTOCells.articleValue.address + ' -  ячейка содержит дублированное значение');
            break;
        }
    }
    let color = valueService.getObjectValue(productDTOCells.colorValue);
    if (color != null && valueService.normalizedSliceIncludes(articleValue, color)) {
        cellStyleService.setError(productDTOCells.articleValue)
        ErrorService.addBug(productDTOCells.articleValue.address + ' -  ячейка содержит цвет');
    }
}

module.exports = {
    checkTypeArticle,
    checkValueArticle,
};