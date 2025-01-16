const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkSizeAdults(productDTO, sizeAdultData) {

    let clothingSizeTypeValue = valueService.getObjectValue(productDTO.clothingSizeType);
    let clothingSizeValueValue = valueService.getObjectValue(productDTO.clothingSizeValue);
    if (clothingSizeTypeValue == null) {
        cellStyleService.setError(productDTO.clothingSizeType);
        return;
    }
    if (clothingSizeValueValue == null) {
        cellStyleService.setError(productDTO.clothingSizeValue);
        return;
    }
    if (sizeAdultData && sizeAdultData.length > 0) {
        const result = sizeAdultData.find(item => item.type = clothingSizeTypeValue && item.value === clothingSizeValueValue);
        if (result === undefined) {
            cellStyleService.setError(productDTO.clothingSizeValue);
        }
    }
}

module.exports = {checkSizeAdults};