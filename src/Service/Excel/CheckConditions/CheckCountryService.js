const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkCountries(cellCountry, countryData) {

    let error;
    let cellCountryValue = valueService.getObjectValue(cellCountry);
    if (cellCountryValue == null) {
        cellStyleService.setError(cellCountry);
        error = cellCountry.address + ' - пустое значение';
        return {error: error};
    }
    if (countryData && countryData.length > 0) {
        const result = countryData.find(item => valueService.compareStrings(item.country, cellCountryValue));
        if (result === undefined) {
            cellStyleService.setError(cellCountry);
            error = cellCountry.address + ' - страна ' + cellCountryValue + ' не существует в бд';
        }
    } else {
        throw new Error('Отсутствуют данные бд таблицы "countries"');
    }
    return {error: error};
}

module.exports = {checkCountries};