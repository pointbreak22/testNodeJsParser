const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkGender(cellGender, genderData) {

    let cellGenderValue = valueService.getObjectValue(cellGender);
    if (cellGenderValue == null) {
        cellStyleService.setError(cellGender);
        return;
    }
    //console.log(cellGenderValue);
    //console.log(genderData, cellGenderValue);

    if (genderData && genderData.length > 0) {
        const result = genderData.find(item => item.shortName === cellGenderValue);

        if (result !== undefined) {
            cellGender.value = result.rightName;
            cellStyleService.setEdit(cellGender);
        }
    } else {
        throw new Error('Отсутствуют данные mysql таблицы Гендер');
    }
}

module.exports = {checkGender};