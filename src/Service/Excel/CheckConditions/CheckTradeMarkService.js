const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkTradeMarks(cellTradeMark, bannedTradeMarkData) {

    let cellTradeMarkValue = valueService.getObjectValue(cellTradeMark);
    if (cellTradeMarkValue == null) {
        cellStyleService.setError(cellTradeMark);
        return;
    }
    if (bannedTradeMarkData && bannedTradeMarkData.length > 0) {
        const result = bannedTradeMarkData.find(item => item.value === cellTradeMarkValue);
        if (result !== undefined) {
            cellStyleService.setError(cellTradeMark);

        }
    }
}

module.exports = {checkTradeMarks};