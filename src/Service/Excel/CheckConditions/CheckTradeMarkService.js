const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

// const transportDTO.errorService = require('../transportDTO.errorService');

async function checkTradeMarks(cellTradeMark, bannedTradeMarkData, transportDTO) {

    let cellTradeMarkValue = valueService.getObjectValue(cellTradeMark);
    if (cellTradeMarkValue == null) {
        cellStyleService.setError(cellTradeMark);
        transportDTO.errorService.addBug(cellTradeMark.address + ' - пустое значение');
        return;
    }
    if (bannedTradeMarkData && bannedTradeMarkData.length > 0) {
        const result = bannedTradeMarkData.find(item => valueService.compareStrings(item.value, cellTradeMarkValue));
        if (result !== undefined) {
            cellStyleService.setError(cellTradeMark);
            transportDTO.errorService.addBug(cellTradeMark.address + ' - значение ' + cellTradeMarkValue + ' в черном списке');
        }
    } else {
        transportDTO.errorService.addError('Отсутствуют данные бд таблицы "banned_brands"');
    }

}

module.exports = {checkTradeMarks};