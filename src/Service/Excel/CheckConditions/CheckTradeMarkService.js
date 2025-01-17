const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkTradeMarks(cellTradeMark, bannedTradeMarkData) {

    let error = null;
    let cellTradeMarkValue = valueService.getObjectValue(cellTradeMark);
    if (cellTradeMarkValue == null) {
        cellStyleService.setError(cellTradeMark);
        error = cellTradeMark.address + ' - пустое значение';
        return error;
    }
    if (bannedTradeMarkData && bannedTradeMarkData.length > 0) {
        const result = bannedTradeMarkData.find(item => item.value === cellTradeMarkValue);
        if (result !== undefined) {
            cellStyleService.setError(cellTradeMark);
            error = cellTradeMark.address + ' - значение ' + cellTradeMarkValue + ' в черном списке';
        }
    } else {
        throw new Error('Отсутствуют данные бд таблицы Черный список');
    }
    return error;
}

module.exports = {checkTradeMarks};