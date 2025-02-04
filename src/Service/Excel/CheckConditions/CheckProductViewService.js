const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');
const ErrorService = require('../ErrorService');

async function checkProductView(productDTOCells, productViewData, isBaby) {

    const selectingCategory = {
        true: "детский",
        false: "взрослый"
    }

    let cellProductViewValue = valueService.getObjectValue(productDTOCells.productView);
    if (cellProductViewValue == null) {
        cellStyleService.setError(productDTOCells.productView);
        ErrorService.addBug(productDTOCells.productView.address + ' - пустое значение');
        return;
    }
    if (productViewData && productViewData.length > 0) {
        const result = productViewData.find(item => valueService.compareStrings(item.value, cellProductViewValue)
            && valueService.normalizedIncludes(item.category, selectingCategory[isBaby])
        );
        if (result === undefined) {
            cellStyleService.setError(productDTOCells.productView);
            ErrorService.addBug(productDTOCells.productView.address + ' - значение не соответствует условию или отсутствует в бд таблицы "types_clothing"');
        }
    } else {
        ErrorService.addError('Отсутствуют данные бд таблицы "types_clothing"');
    }
}

module.exports = {checkProductView};