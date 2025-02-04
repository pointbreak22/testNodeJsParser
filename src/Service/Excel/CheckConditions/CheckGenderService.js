const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');
const configGender = require('../../../../config.json').Gender;
const ErrorService = require('../ErrorService');

async function checkGender(cellGender, cellStandardNumber, genderData) {

    let cellGenderValue = valueService.getObjectValue(cellGender);
    if (cellGenderValue == null) {
        cellStyleService.setError(cellGender);
        ErrorService.addBug(cellGender.address + ' - пустое значение');
        return;
    }
    if (genderData && genderData.length > 0) {
        const result = genderData.find(item => item.value === cellGenderValue);
        if (result !== undefined) {

            if (configGender[result.value.toLowerCase()]) {
                cellGender.value = configGender[result.value];
                cellStyleService.setEdit(cellGender);
                ErrorService.addChange(cellGender.address + ' значение изменено');
            }

        } else {
            cellStyleService.setError(cellGender);
            ErrorService.addBug(cellGender.address + ' - указано не верное значение отсутствующее в бд таблицы "genders"');
        }

    } else {
        ErrorService.addError('Отсутствуют данные в бд таблицы "genders"');
    }
}

module.exports = {checkGender};