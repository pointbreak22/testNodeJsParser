const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');
const ErrorService = require('../ErrorService');

async function checkTradeMarks(cellTradeMark, bannedTradeMarkData) {

    let cellTradeMarkValue = valueService.getObjectValue(cellTradeMark);
    if (cellTradeMarkValue == null) {
        cellStyleService.setError(cellTradeMark);
        ErrorService.addBug(cellTradeMark.address + ' - пустое значение');
        return;
    }
    if (bannedTradeMarkData && bannedTradeMarkData.length > 0) {
        const result = bannedTradeMarkData.find(item => valueService.compareStrings(item.value, cellTradeMarkValue));
        if (result !== undefined) {
            cellStyleService.setError(cellTradeMark);
            ErrorService.addBug(cellTradeMark.address + ' - значение ' + cellTradeMarkValue + ' в черном списке');
        }
    } else {
        ErrorService.addError('Отсутствуют данные бд таблицы "banned_brands"');
    }

}

module.exports = {checkTradeMarks};