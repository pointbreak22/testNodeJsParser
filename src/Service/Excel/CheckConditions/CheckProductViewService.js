const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

// const transportDTO.errorService = require('../transportDTO.errorService');

async function checkProductView(productDTOCells, productViewData, isBaby, transportDTO) {

    const selectingCategory = {
        true: "детский",
        false: "взрослый"
    }

    let cellProductViewValue = valueService.getObjectValue(productDTOCells.productView);
    if (cellProductViewValue == null) {
        cellStyleService.setError(productDTOCells.productView);
        transportDTO.errorService.addBug(productDTOCells.productView.address + ' - пустое значение');
        return;
    }
    if (productViewData && productViewData.length > 0) {
        const result = productViewData.find(item => valueService.compareStrings(item.value, cellProductViewValue)
            && valueService.normalizedIncludes(item.category, selectingCategory[isBaby])
        );
        if (result === undefined) {
            cellStyleService.setError(productDTOCells.productView);
            transportDTO.errorService.addBug(productDTOCells.productView.address + ' - значение не соответствует условию или отсутствует в бд таблицы types_clothing');
        }
    } else {
        transportDTO.errorService.addError('Отсутствуют данные бд таблицы types_clothing');
    }
}

module.exports = {checkProductView};