const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkSizeAdults(productDTO, sizeAdultData) {

    let error = '';
    let clothingSizeTypeValue = valueService.getObjectValue(productDTO.clothingSizeType);
    let clothingSizeValueValue = valueService.getObjectValue(productDTO.clothingSizeValue);
    if (clothingSizeTypeValue == null) {
        cellStyleService.setError(productDTO.clothingSizeType);
        error = productDTO.clothingSizeType.address + ' - пустое значение';
        return error;
    }
    if (clothingSizeValueValue == null) {
        cellStyleService.setError(productDTO.clothingSizeValue);
        error = productDTO.clothingSizeValue.address + ' - пустое значение';
        return error;
    }

    if (sizeAdultData && sizeAdultData.length > 0) {
        const result = sizeAdultData.find(item => item.type = clothingSizeTypeValue && item.value === clothingSizeValueValue);
        if (result === undefined) {
            cellStyleService.setError(productDTO.clothingSizeValue);
            error = productDTO.clothingSizeValue.address + ' - значение отсутствует в бд тип одежды';
        }
    } else {
        throw new Error('Отсутствуют данные mysql таблицы Тип Одежды');
    }
    return error;

}

module.exports = {checkSizeAdults};