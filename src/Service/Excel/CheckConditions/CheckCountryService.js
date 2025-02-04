const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkCountries(cellCountry, countryData, transportDTO) {
    let cellCountryValue = valueService.getObjectValue(cellCountry);
    if (cellCountryValue == null) {
        cellStyleService.setError(cellCountry);
        transportDTO.errorService.addBug(cellCountry.address + ' - пустое значение');
        return;
    }
    if (countryData && countryData.length > 0) {
        const result = countryData.find(item => valueService.compareStrings(item.country, cellCountryValue));
        if (result === undefined) {
            cellStyleService.setError(cellCountry);
            transportDTO.errorService.addBug(cellCountry.address + ' - страна ' + cellCountryValue + ' не существует в бд');
        }
        if (result.correct !== undefined && result.correct != null) {
            cellCountry.value = result.correct;
            transportDTO.errorService.addChange(cellCountry.address + ' - значение изменено');
            cellStyleService.setEdit(cellCountry);

        }
    } else {
        transportDTO.errorService.addError('Отсутствуют данные бд таблицы "countries"');
    }
}

module.exports = {checkCountries};