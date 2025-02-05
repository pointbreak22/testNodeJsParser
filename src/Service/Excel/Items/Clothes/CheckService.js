const CheckNameService = require("../../CheckConditions/CheckNameService");
const CheckTradeMarkService = require("../../CheckConditions/CheckTradeMarkService");
const CheckModelService = require("../../CheckConditions/CheckArticleService");
const CheckColorService = require("../../CheckConditions/CheckColorService");
const CheckGenderService = require("../../CheckConditions/CheckGenderService");
const CheckSizeAdultService = require("../../CheckConditions/CheckSizeAdultService");
const CheckCountService = require("../../CheckConditions/CheckCountService");
const CheckCountryService = require("../../CheckConditions/CheckCountryService");
const CheckCompositionService = require("../../CheckConditions/CheckCompositionService");
const CheckTnvedCodesService = require("../../CheckConditions/CheckTnvedCodesService");
const CheckStandardNumberService = require("../../CheckConditions/CheckStandartNumberService");
const CheckProductViewService = require("../../CheckConditions/CheckProductViewService");
const CheckTnvedShortService = require("../../CheckConditions/CheckTnvedShortService");
const CheckDeclarationService = require("../../CheckConditions/CheckDeclarationService");
const DTOService = require("./DTOService");

const CheckAgeTypeService = require("../../CheckConditions/CheckAgeTypeService");

function getClothesChecks(row, dbData, transportDTO) {
    const clotheDTO = DTOService.getClotheDTO(row);
    const isBaby = CheckAgeTypeService.isBaby(clotheDTO)

    return [
        {name: "№1", promise: CheckNameService.checkNameMore80(clotheDTO, transportDTO)},
        {
            name: "№2",
            promise: CheckTradeMarkService.checkTradeMarks(clotheDTO.trademark, dbData.banedTradeMarkData, transportDTO)
        },
        {name: "№3", promise: CheckModelService.checkTypeArticle(clotheDTO.articleType, transportDTO)},
        {name: "№4", promise: CheckModelService.checkValueArticle(clotheDTO, transportDTO)},
        {
            name: "№5",
            promise: CheckProductViewService.checkProductView(clotheDTO, dbData.productViewResult, isBaby, transportDTO)
        },
        {
            name: "№6",
            promise: CheckColorService.checkColor(clotheDTO.colorValue, dbData.colorsDataResult, transportDTO)
        },
        {
            name: "№7",
            promise: CheckGenderService.checkGender(clotheDTO.targetFloor, clotheDTO.standardNumber, dbData.genderData, transportDTO)
        },
        // {name: "№8", promise: CheckSizeAdultService.checkSizeAdults(clotheDTO, dbData.sizesDataResult)}, //не работает
        {
            name: "№9",
            promise: CheckCompositionService.checkComposition(clotheDTO.composition, dbData.compositionDataResult, transportDTO)
        },
        {
            name: "№10",
            promise: CheckTnvedCodesService.checkTnvedCodes(clotheDTO, dbData.tnvedCodesDataResult, isBaby, transportDTO)
        },

        {
            name: "№11",
            promise: CheckStandardNumberService.checkStandard(clotheDTO, isBaby, transportDTO)
        },
        {
            name: "№12",
            promise: CheckCountryService.checkCountries(clotheDTO.country, dbData.countriesResult, transportDTO)
        },
        {name: "№13", promise: CheckCountService.checkCellCount(clotheDTO.count, transportDTO)},
        {
            name: "№1A",
            promise: CheckTnvedShortService.checkTnvedShortCodes(clotheDTO, dbData.tnvedShortDataResult, transportDTO)
        },

        {
            name: "№4A",
            promise: CheckDeclarationService.checkDeclarations(clotheDTO, dbData.declarationDataResult, transportDTO)
        },
    ];

}

module.exports = {getClothesChecks};