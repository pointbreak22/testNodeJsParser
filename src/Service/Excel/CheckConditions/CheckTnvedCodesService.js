const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

const configGender = require('../../../../config.json').Gender;

async function checkTnvedCodes(cellsProductDTO, tnvedCodesData, isBaby) {

    let error;

    let cellTnvedCodeValue = valueService.getObjectValue(cellsProductDTO.tnvedCode);
    let cellProductViewValue = valueService.getObjectValue(cellsProductDTO.productView);
    let cellTargetFloorValue = valueService.getObjectValue(cellsProductDTO.targetFloor);
    let cellComposition = valueService.getObjectValue(cellsProductDTO.composition);

    if (cellTnvedCodeValue == null) {
        cellStyleService.setError(cellsProductDTO.tnvedCode);
        error = cellsProductDTO.tnvedCode.address + ' - пустое значение';
        return {error: error};
    }

    if (cellTnvedCodeValue.length > 10 || cellTnvedCodeValue.length < 10) {
        cellStyleService.setError(cellsProductDTO.tnvedCode);
        error = cellsProductDTO.tnvedCode.address + ' - количество символов ≠ 10';
        return {error: error};
    }

    if (cellProductViewValue == null) {
        // cellStyleService.setError(cellsProductDTO.productView);
        error = cellsProductDTO.productView.address + ' - пустое значение';
        return {error: error};
    }

    if (tnvedCodesData.tnvedDesc && tnvedCodesData.tnvedDesc.length > 0) {

        let targetFloor = configGender[cellTargetFloorValue] ? configGender[cellTargetFloorValue] : cellTargetFloorValue;

        let resultTnvedCode = tnvedCodesData.tnvedDesc.find(item => item.code.toString() === cellTnvedCodeValue.toString() &&
            valueService.normalizedIncludes(item.typeProduct, cellProductViewValue) &&
            valueService.normalizedIncludes(item.gender, targetFloor));
        if (resultTnvedCode === undefined) {
            cellStyleService.setError(cellsProductDTO.tnvedCode);
            error = cellsProductDTO.tnvedCode.address + ' - значение отсутствует в бд "codes_tnved_desc" или не соответствует условию';
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
//sort((a, b) => b.typeComposition.length - a.typeComposition.length).
            if (resultTnvedCode === undefined) {
                cellStyleService.setError(cellsProductDTO.tnvedCode);
            } else {
                cellsProductDTO.tnvedCode.value = resultTnvedCode.code;
                cellStyleService.setEdit(cellsProductDTO.tnvedCode);

            }

        } else {
            //   cellStyleService.setEdit(cellsProductDTO.tnvedCode);
        }
        // if (valueService.normalizedIncludes(resultTnvedCode.typeComposition, findCompositions)) {
        //
        // } else {
        //     cellStyleService.setEdit(cellsProductDTO.tnvedCode);
        // }

    } else {
        throw new Error('Отсутствуют данные бд таблицы "codes_tnved_desc"');
    }
    return {error: error};
}

// function hasSubstringMatch(arr1, arr2) {
//     return arr1.some(str1 => arr2.some(str2 => valueService.normalizedIncludes(str2, str1)));
// }

function getMostFrequentComposition(filteredItems) {
    const compositions = filteredItems.map(item => item.category);

    let uniqueCompositions = [...new Set(compositions)];

    return uniqueCompositions.filter(item =>
        !uniqueCompositions.some(otherItem => valueService.anCompareStrings(otherItem, item)
            && valueService.normalizedIncludes(otherItem, item))
    );
}

module.exports = {checkTnvedCodes};