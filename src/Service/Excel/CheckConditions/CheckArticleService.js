const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkTypeArticle(cellTypeModel) {
    const list = ['Модель', 'Артикул', 'Модель/Артикул'];
    let typeModelValue = valueService.getObjectValue(cellTypeModel);
    if (typeModelValue == null || (typeof typeModelValue === 'string' && !list.includes(typeModelValue))) {
        cellStyleService.setError(cellTypeModel);
    }
}

async function checkValueArticle(productDTOCells) {

    let error = '';
    const list = [
        valueService.getObjectValue(productDTOCells.productView),
        valueService.getObjectValue(productDTOCells.colorValue),
        valueService.getObjectValue(productDTOCells.targetFloor),
        valueService.getObjectValue(productDTOCells.trademark),
        valueService.getObjectValue(productDTOCells.composition),
    ];
    let articleValue = valueService.getObjectValue(productDTOCells.articleValue);
    if (articleValue == null || list.includes(articleValue)) {
        cellStyleService.setError(productDTOCells.articleValue);
        error = productDTOCells.articleValue.address + ' -  пустое или не верное значение';

    }

    return error;
}

module.exports = {
    checkTypeArticle,
    checkValueArticle,
};