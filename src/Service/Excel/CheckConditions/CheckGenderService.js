const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');
const configGender = require('../../../../config.json').Gender;

async function checkGender(cellGender, cellStandardNumber, genderData) {

    let error;
    let edit;

    let cellGenderValue = valueService.getObjectValue(cellGender);
    if (cellGenderValue == null) {
        cellStyleService.setError(cellGender);
        error = cellGender.address + ' - пустое значение';
        return {error: error};
    }
    if (genderData && genderData.length > 0) {
        const result = genderData.find(item => item.value === cellGenderValue);
        if (result !== undefined) {
            if (result.value.toLowerCase().startsWith('дет')) {
                if (configGender[result.value.toLowerCase()]) {
                    cellGender.value = configGender[result.value.toLowerCase()];
                    cellStyleService.setEdit(cellGender);
                    edit = cellGender.address + ' значение изменено';
                }
            } else {
                if (configGender[result.value.toLowerCase()]) {
                    cellGender.value = configGender[result.value.toLowerCase()];
                    cellStyleService.setEdit(cellGender);
                    edit = cellGender.address + ' значение изменено';
                }
            }

        } else {
            cellStyleService.setError(cellGender);
            error = cellGender.address + ' - указано не верное значение отсутствующее в бд таблицы "genders"';
        }

    } else {
        throw new Error('Отсутствуют данные в бд таблицы "genders"');
    }
    return {error: error, edit: edit};
}

module.exports = {checkGender};