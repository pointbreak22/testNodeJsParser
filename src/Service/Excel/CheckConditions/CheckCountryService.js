const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');
const ErrorService = require('../ErrorService');

async function checkCountries(cellCountry, countryData) {
    let cellCountryValue = valueService.getObjectValue(cellCountry);
    if (cellCountryValue == null) {
        cellStyleService.setError(cellCountry);
        ErrorService.addBug(cellCountry.address + ' - пустое значение');
        return;
    }
    if (countryData && countryData.length > 0) {
        const result = countryData.find(item => valueService.compareStrings(item.country, cellCountryValue));
        if (result === undefined) {
            cellStyleService.setError(cellCountry);
            ErrorService.addBug(cellCountry.address + ' - страна ' + cellCountryValue + ' не существует в бд');
        }
    } else {
        ErrorService.addError('Отсутствуют данные бд таблицы "countries"');
    }
}

module.exports = {checkCountries};