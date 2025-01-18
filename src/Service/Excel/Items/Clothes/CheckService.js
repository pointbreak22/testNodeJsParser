const CheckNameService = require("../../CheckConditions/CheckNameService");
const CheckTradeMarkService = require("../../CheckConditions/CheckTradeMarkService");
const CheckModelService = require("../../CheckConditions/CheckArticleService");
const CheckColorService = require("../../CheckConditions/CheckColorService");
const CheckGenderService = require("../../CheckConditions/CheckGenderService");
const CheckSizeAdultService = require("../../CheckConditions/CheckSizeAdultService");
const CheckCountService = require("../../CheckConditions/CheckCountService");
const DTOService = require("./DTOService");

function getClothesChecks(row, dbData) {
    const clotheDTO = DTOService.getClotheDTO(row);
    return [
        {name: "№1", promise: CheckNameService.checkNameMore80(clotheDTO.name)},
        {
            name: "№2",
            promise: CheckTradeMarkService.checkTradeMarks(clotheDTO.trademark, dbData.banedTradeMarkData)
        },
        {name: "№3", promise: CheckModelService.checkTypeArticle(clotheDTO.articleType)},
        {name: "№4", promise: CheckModelService.checkValueArticle(clotheDTO)},
        {name: "№6", promise: CheckColorService.checkColor(clotheDTO.colorValue, dbData.colorsDataResult)},
        {name: "№7", promise: CheckGenderService.checkGender(clotheDTO.targetFloor, dbData.genderData)},
        {name: "№8", promise: CheckSizeAdultService.checkSizeAdults(clotheDTO, dbData.sizesDataResult)},
        {name: "№13", promise: CheckCountService.checkCellCount(clotheDTO.count)},
    ];
}

module.exports = {getClothesChecks};