const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');
const ErrorService = require('../ErrorService');

async function checkSizeAdults(productDTO, sizeAdultData) {

    let clothingSizeTypeValue = valueService.getObjectValue(productDTO.clothingSizeType);
    let clothingSizeValueValue = valueService.getObjectValue(productDTO.clothingSizeValue);
    if (clothingSizeTypeValue == null) {
        cellStyleService.setError(productDTO.clothingSizeType);
        ErrorService.addBug(productDTO.clothingSizeType.address + ' - пустое значение');
        return;
    }
    if (clothingSizeValueValue == null) {
        cellStyleService.setError(productDTO.clothingSizeValue);
        ErrorService.addBug(productDTO.clothingSizeValue.address + ' - пустое значение');
        return;
    }
    if (sizeAdultData && sizeAdultData.length > 0) {
        const result = sizeAdultData.find(item => item.type = clothingSizeTypeValue && item.value === clothingSizeValueValue);
        if (result === undefined) {
            cellStyleService.setError(productDTO.clothingSizeValue);
            ErrorService.addBug(productDTO.clothingSizeValue.address + ' - значение отсутствует в бд тип одежды');
        }
    } else {
        ErrorService.addError('Отсутствуют данные mysql таблицы Тип Одежды');
    }

}

module.exports = {checkSizeAdults};