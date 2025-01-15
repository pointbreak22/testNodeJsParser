const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');


function checkTypeArticle(cellTypeModel) {
    const list = ['Модель', 'Артикул', 'Модель/Артикул'];
    let typeModelValue = valueService.getObjectValue(cellTypeModel);
    if (typeModelValue == null || (typeof typeModelValue === 'string' && !list.includes(typeModelValue))) {
        cellStyleService.setError(cellTypeModel);
    }
}

/**
 * Проверяет значение статьи товара
 * @param {ProductDTO} productDTOCells - объект с полями продукта
 */
function checkValueArticle(productDTOCells) {

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
    }

}

module.exports = {
    checkTypeArticle,
    checkValueArticle,
};