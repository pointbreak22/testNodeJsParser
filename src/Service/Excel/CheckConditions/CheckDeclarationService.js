const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkDeclarations(productDTO, declarationDataResult, transportDTO) {

    let personInn = valueService.getObjectValue(transportDTO.cellInn);
    //console.log(personInn);

    let cellCountryValue = valueService.getObjectValue(productDTO.country);
    let cellDeclarationValue = valueService.getObjectValue(productDTO.declaration);

    if (declarationDataResult && declarationDataResult.length > 0) {
        // let result = declarationDataResult.find(item => valueService.compareStrings(item.applicantInn, personInn));
        //
        // if (result === undefined) {
        //     cellStyleService.setError(transportDTO.cellInn);
        //     transportDTO.errorService.addMain(transportDTO.cellInn.address + ' - значение Инн ' + transportDTO.cellInn.value + ' отсутствует в бд таблицы declarations');
        // }

        let result = declarationDataResult.find(item => valueService.compareStrings(item.applicantInn, personInn) &&
            valueService.compareStrings(item.producerInn, personInn) &&
            valueService.compareStrings(item.orderNumber, cellDeclarationValue) &&
            valueService.compareStrings(item.country, 'Россия') &&
            valueService.compareStrings(cellCountryValue, 'Россия'));

        if (result !== undefined) {
            transportDTO.errorService.addMain('Контрактное производство');
        }
        result = declarationDataResult.find(item => valueService.compareStrings(item.applicantInn, personInn) &&
            valueService.compareStrings(item.orderNumber, cellDeclarationValue) &&
            valueService.anCompareStrings(item.country, 'Россия') &&
            valueService.anCompareStrings(cellCountryValue, 'Россия'));
        if (result !== undefined) {
            transportDTO.errorService.addMain('Импорт из под ДС клиента');
        }

        if (cellCountryValue != null && cellDeclarationValue == null) {
            transportDTO.errorService.addMain('Стандарт');
        }

    } else {
        transportDTO.errorService.addError('Отсутствуют данные бд таблицы "declarations"');
    }
}

module.exports = {checkDeclarations};