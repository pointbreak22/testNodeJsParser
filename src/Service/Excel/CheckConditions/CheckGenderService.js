const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');
const configGender = require('../../../../config.json').Gender;

async function checkGender(cellGender, cellStandardNumber, genderData) {

    let error = '';

    let cellGenderValue = valueService.getObjectValue(cellGender);
    if (cellGenderValue == null) {
        cellStyleService.setError(cellGender);
        error = cellGender.address + ' - пустое значение';
        return error;
    }
    if (genderData && genderData.length > 0) {
        const result = genderData.find(item => item.value === cellGenderValue);
        if (result !== undefined) {
            if (result.value.toLowerCase().startsWith('дет')) {
                // cellStandardNumber.value = 'ТР ТС 007/2011 “О безопасности продукции, предназначенной для детей и подростков”';
                if (configGender[result.value.toLowerCase()]) {
                    cellGender.value = configGender[result.value.toLowerCase()];
                }
            } else {
                // cellStandardNumber.value = 'ТР ТС 017/2011 "О безопасности продукции легкой промышленности"';
                if (configGender[result.value.toLowerCase()]) {
                    cellGender.value = configGender[result.value.toLowerCase()];
                }
            }

        } else {
            cellStyleService.setError(cellGender);
            error = cellGender.address + ' - указано не верное значение отсутствующее в бд гендер';
        }

    } else {
        throw new Error('Отсутствуют данные mysql таблицы Гендер');
    }
    return error;
}

module.exports = {checkGender};