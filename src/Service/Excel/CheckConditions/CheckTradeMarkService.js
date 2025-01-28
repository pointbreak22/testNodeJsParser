const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkTradeMarks(cellTradeMark, bannedTradeMarkData) {

    let error;
    let cellTradeMarkValue = valueService.getObjectValue(cellTradeMark);
    if (cellTradeMarkValue == null) {
        cellStyleService.setError(cellTradeMark);
        error = cellTradeMark.address + ' - пустое значение';
        return {error: error};
    }
    if (bannedTradeMarkData && bannedTradeMarkData.length > 0) {
        const result = bannedTradeMarkData.find(item => valueService.compareStrings(item.value, cellTradeMarkValue));
        if (result !== undefined) {
            cellStyleService.setError(cellTradeMark);
            error = cellTradeMark.address + ' - значение ' + cellTradeMarkValue + ' в черном списке';
        }
    } else {
        throw new Error('Отсутствуют данные бд таблицы "banned_brands"');
    }
    return {error: error};
}

module.exports = {checkTradeMarks};