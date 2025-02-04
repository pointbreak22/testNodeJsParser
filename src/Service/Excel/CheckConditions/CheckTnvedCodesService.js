const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');
// const transportDTO.errorService = require('../transportDTO.errorService');

const configGender = require('../../../../config.json').Gender;

async function checkTnvedCodes(cellsProductDTO, tnvedCodesData, isBaby, transportDTO) {

    let cellTnvedCodeValue = valueService.getObjectValue(cellsProductDTO.tnvedCode);
    let cellProductViewValue = valueService.getObjectValue(cellsProductDTO.productView);
    let cellTargetFloorValue = valueService.getObjectValue(cellsProductDTO.targetFloor);
    let cellComposition = valueService.getObjectValue(cellsProductDTO.composition);

    if (cellTnvedCodeValue == null) {
        cellStyleService.setError(cellsProductDTO.tnvedCode);
        transportDTO.errorService.addBug(cellsProductDTO.tnvedCode.address + ' - пустое значение');
        return;
    }

    if (cellTnvedCodeValue.length > 10 || cellTnvedCodeValue.length < 10) {
        cellStyleService.setError(cellsProductDTO.tnvedCode);
        transportDTO.errorService.addBug(cellsProductDTO.tnvedCode.address + ' - количество символов ≠ 10');
        return;
    }

    if (cellProductViewValue == null) {
        cellStyleService.setError(cellsProductDTO.productView);
        transportDTO.errorService.addBug(cellsProductDTO.productView.address + ' - пустое значение');
        return;
    }

    if (tnvedCodesData.tnvedDesc && tnvedCodesData.tnvedDesc.length > 0) {

        let targetFloor = configGender[cellTargetFloorValue] ? configGender[cellTargetFloorValue] : cellTargetFloorValue;
        let resultTnvedCode = tnvedCodesData.tnvedDesc.find(item => item.code.toString() === cellTnvedCodeValue.toString() &&
            valueService.normalizedIncludes(item.typeProduct, cellProductViewValue) &&
            valueService.normalizedIncludes(item.gender, targetFloor));
        if (resultTnvedCode === undefined) {
            cellStyleService.setError(cellsProductDTO.tnvedCode);
            transportDTO.errorService.addBug(cellsProductDTO.tnvedCode.address + ' - значение отсутствует в бд "codes_tnved_desc" или не соответствует условию');
        } else {
            resultTnvedCode.typeComposition = resultTnvedCode.typeComposition.replace(/:/g, '')
        }

        const resultComposition = tnvedCodesData.typesComposition.filter(item => valueService.normalizedIncludes(cellComposition, item.value))
        // console.log(resultComposition);
        let findCompositions = getMostFrequentComposition(resultComposition);
        //

        let typeComposition = findCompositions.find(value => valueService.normalizedIncludes(value, resultTnvedCode.typeComposition))
        // console.log(typeComposition);
        if (typeComposition === undefined) {

            resultTnvedCode = tnvedCodesData.tnvedDesc.find(item => findCompositions.some(str => valueService.normalizedIncludes(str, item.typeComposition)) &&
                valueService.normalizedIncludes(item.typeProduct, cellProductViewValue) &&
                valueService.normalizedIncludes(item.gender, targetFloor));
            if (resultTnvedCode === undefined) {
                cellStyleService.setError(cellsProductDTO.tnvedCode);
            } else {
                cellsProductDTO.tnvedCode.value = resultTnvedCode.code;
                cellStyleService.setEdit(cellsProductDTO.tnvedCode);

            }

        } else {

        }

    } else {
        transportDTO.errorService.addError('Отсутствуют данные бд таблицы "codes_tnved_desc"');
    }

}

function getMostFrequentComposition(filteredItems) {
    const compositions = filteredItems.map(item => item.category);

    let uniqueCompositions = [...new Set(compositions)];

    return uniqueCompositions.filter(item =>
        !uniqueCompositions.some(otherItem => valueService.anCompareStrings(otherItem, item)
            && valueService.normalizedIncludes(otherItem, item))
    );
}

module.exports = {checkTnvedCodes};