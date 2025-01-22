const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

const configGender = require('../../../../config.json').Gender;

async function checkTnvedCodes(cellsProductDTO, tnvedCodesData) {

    let error = null;

    let cellTnvedCodeValue = valueService.getObjectValue(cellsProductDTO.tnvedCode);
    let cellProductViewValue = valueService.getObjectValue(cellsProductDTO.productView);
    let cellTargetFloorValue = valueService.getObjectValue(cellsProductDTO.targetFloor);

    if (cellTnvedCodeValue == null) {
        cellStyleService.setError(cellsProductDTO.tnvedCode);
        error = cellsProductDTO.tnvedCode.address + ' - пустое значение';
        return error;
    }

    if (cellTnvedCodeValue.length > 10 || cellTnvedCodeValue.length < 10) {
        cellStyleService.setError(cellsProductDTO.tnvedCode);
        error = cellsProductDTO.tnvedCode.address + ' - количество символов ≠ 10';
        return error;
    }

    if (cellProductViewValue == null) {
        cellStyleService.setError(cellsProductDTO.productView);
        error = cellsProductDTO.productView.address + ' - пустое значение';
        return error;
    }

    if (tnvedCodesData && tnvedCodesData.length > 0) {

        let targetFloor = configGender[cellTargetFloorValue] ? configGender[cellTargetFloorValue] : cellTargetFloorValue;

        const result = tnvedCodesData.find(item => item.code.toString() === cellTnvedCodeValue.toString() &&
            item.typeProduct.toLowerCase().includes(cellProductViewValue.toLowerCase()) &&
            item.gender.toLowerCase().includes(targetFloor.toLowerCase()));
        if (result === undefined) {

            cellsProductDTO.tnvedCode.note = `${result}, ${cellTnvedCodeValue}, ${cellProductViewValue.toLowerCase()}, ${targetFloor.toLowerCase()}`;
            cellStyleService.setError(cellsProductDTO.tnvedCode);
            error = cellsProductDTO.tnvedCode.address + ' - значение отсутствует в бд или не соответствует условию';
        }
    } else {
        throw new Error('Отсутствуют данные бд таблицы Черный список');
    }
    return error;
}

module.exports = {checkTnvedCodes};