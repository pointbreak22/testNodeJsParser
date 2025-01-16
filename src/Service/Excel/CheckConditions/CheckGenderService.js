const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkGender(cellGender, genderData) {

    let cellGenderValue = valueService.getObjectValue(cellGender);
    if (cellGenderValue == null) {
        cellStyleService.setError(cellGender);
        return;
    }
    if (genderData && genderData.length > 0) {
        const result = genderData.find(item => item.value === cellGenderValue);
        if (result !== undefined) {
            if (result.value.toLowerCase() === 'жен.') {
                cellGender.value = 'ЖЕНСКИЙ';
                cellStyleService.setEdit(cellGender);
            } else if (result.value.toLowerCase() === 'муж.') {
                cellGender.value = 'МУЖСКОЙ';
                cellStyleService.setEdit(cellGender);
            } else if (result.value.toLowerCase() === 'дет.' || result.value.toLowerCase() === 'уни.') {
                cellGender.value = 'УНИВЕРСАЛЬНЫЙ (УНИСЕКС)';
                cellStyleService.setEdit(cellGender);
            }
        } else {
            cellStyleService.setError(cellGender);
        }
    } else {
        throw new Error('Отсутствуют данные mysql таблицы Гендер');
    }
}

module.exports = {checkGender};