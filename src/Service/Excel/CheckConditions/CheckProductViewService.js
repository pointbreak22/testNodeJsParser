const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkProductView(productDTOCells, productViewData, isBaby) {

    let error;

    const selectingCategory = {
        true: "детский",
        false: "взрослый"
    }

    let cellProductViewValue = valueService.getObjectValue(productDTOCells.productView);
    if (cellProductViewValue == null) {
        cellStyleService.setError(productDTOCells.productView);
        error = productDTOCells.productView.address + ' - пустое значение';
        return {error: error};
    }
    if (productViewData && productViewData.length > 0) {
        const result = productViewData.find(item => item.value.toLowerCase().replace(/ё/g, 'е') === cellProductViewValue.toLowerCase().replace(/ё/g, 'е')
            && item.category.toLowerCase().includes(selectingCategory[isBaby].toLowerCase())
        );
        if (result === undefined) {
            cellStyleService.setError(productDTOCells.productView);
            error = productDTOCells.productView.address + ' - значение не соответствует условию или отсутствует в бд таблицы "types_clothing"';
        }
    } else {
        throw new Error('Отсутствуют данные бд таблицы "types_clothing"');
    }
    return {error: error};
}

module.exports = {checkProductView};