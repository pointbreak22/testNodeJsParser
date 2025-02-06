const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');
const configGender = require('../../../../config.json').Gender;

// const transportDTO.errorService = require('../transportDTO.errorService');

async function checkGender(cellGender, cellStandardNumber, genderData, transportDTO) {

    let cellGenderValue = valueService.getObjectValue(cellGender);
    if (cellGenderValue == null) {
        cellStyleService.setError(cellGender);
        transportDTO.errorService.addBug(cellGender.address + ' - пустое значение');
        return;
    }

    if (genderData && genderData.length > 0) {
        const result = genderData.find(item => item.value === cellGenderValue);
        if (result !== undefined) {

            if (configGender[result.value.toLowerCase()]) {
                cellGender.value = configGender[result.value];
                cellStyleService.setEdit(cellGender);
                transportDTO.errorService.addChange(cellGender.address + ' - значение изменено');
            }

        } else {
            cellStyleService.setError(cellGender);
            transportDTO.errorService.addBug(cellGender.address + ' - указано неверное значение отсутствующее в бд таблицы genders');
        }

    } else {
        transportDTO.errorService.addError('Отсутствуют данные в бд таблицы genders');
    }
}

module.exports = {checkGender};