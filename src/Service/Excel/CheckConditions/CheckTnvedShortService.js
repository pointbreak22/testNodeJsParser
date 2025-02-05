const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkTnvedShortCodes(productDTO, tnvedShortDataResult, transportDTO) {

    let cellTnvedShort = productDTO.code;
    let cellTnvedShortValue = valueService.getObjectValue(cellTnvedShort);
    let cellTnvedCodeValue = valueService.getObjectValue(productDTO.tnvedCode);

    if (tnvedShortDataResult && tnvedShortDataResult.length > 0) {
        const result = tnvedShortDataResult.find(item => valueService.normalizedIncludes(cellTnvedCodeValue, item.value));
        if (result !== undefined) {
            cellTnvedShort.value = result.value;
            transportDTO.errorService.addChange(cellTnvedShort.address + 'значение было взято из таблицы codes_tnved_short')
            cellStyleService.setEdit(cellTnvedShort);
        } else if (cellTnvedShortValue == null || valueService.anCompareStrings(cellTnvedCodeValue.toString().slice(0, 4), cellTnvedShortValue)) {
            cellTnvedShort.value = cellTnvedCodeValue.toString().slice(0, 4);
            transportDTO.errorService.addChange(cellTnvedShort.address + 'было пустое и не верное значение')
            cellStyleService.setEdit(cellTnvedShort);
        }

    } else {
        transportDTO.errorService.addError('Отсутствуют данные бд таблицы "codes_tnved_short"');
    }

}

module.exports = {checkTnvedShortCodes};