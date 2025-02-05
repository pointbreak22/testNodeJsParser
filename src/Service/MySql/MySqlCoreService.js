const GenderData = require('../../Repository/MySql/GenderRepository')
const TradeMarkData = require('../../Repository/MySql/TradeMarkRepository');
const ColorsData = require('../../Repository/MySql/ColorsRepository')
const SizeAdultData = require('../../Repository/MySql/SizeRepository')
const CountryData = require('../../Repository/MySql/CountryRepository')
const CompositionData = require('../../Repository/MySql/CompositionRepository')
const TnvedCodesData = require('../../Repository/MySql/TnvedCodesRepository')
const ProductViewData = require('../../Repository/MySql/ProductViewRepository')
const TnvedShortData = require('../../Repository/MySql/TnvedShortRepository')
const DeclarationData = require('../../Repository/MySql/DeclarationRepository')

async function fetchData() {
    try {
        const results = await Promise.allSettled([

            TradeMarkData.getBanedBrandsData(), //получаем черный список для "товарный знак" №2
            ProductViewData.getProductViewData(), // получаем вид товара №5
            ColorsData.getColorsData(),  //№6 цвета
            GenderData.getGenderData(),  // Получаем данные о генделе №7
            // SizeAdultData.getSizeAdultData(), // №8 не работает
            CompositionData.getCompositionData(), // db compositions №9
            TnvedCodesData.getTnvedCodesData(), // db codes_tnved_desc №10
            CountryData.getCountryData(), //db Country №12
            TnvedShortData.getTnvedShortData(), //db codes_tnved_short №1
            DeclarationData.getDeclarationsData(), //db declarations №4а

        ]);

        // Обрабатываем результаты
        const [
            tradeMarkDataResult,
            productViewResult,
            colorsDataResult,
            genderDataResult,
            //     sizesDataResult,
            compositionDataResult,
            tnvedCodesDataResult,
            countriesResult,
            tnvedShortDataResult,
            declarationDataResult,
        ] = results;

        // Возвращаем объект, в котором данные таблиц являются свойствами
        return {
            banedTradeMarkData: getPromiseValue(tradeMarkDataResult),
            productViewResult: getPromiseValue(productViewResult),
            colorsDataResult: getPromiseValue(colorsDataResult),
            genderData: getPromiseValue(genderDataResult),
            //   sizesDataResult: sizesDataResult
            compositionDataResult: getPromiseValue(compositionDataResult),
            tnvedCodesDataResult: getPromiseValue(tnvedCodesDataResult),
            countriesResult: getPromiseValue(countriesResult),
            tnvedShortDataResult: getPromiseValue(tnvedShortDataResult),
            declarationDataResult: getPromiseValue(declarationDataResult),
        };
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
}

function getPromiseValue(promise) {
    return promise.status === 'fulfilled' ? promise.value : null
}

module.exports = {
    fetchData
};


