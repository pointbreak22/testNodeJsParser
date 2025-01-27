const GenderData = require('../../Repository/MySql/GenderRepository')
const TradeMarkData = require('../../Repository/MySql/TradeMarkRepository');
const ColorsData = require('../../Repository/MySql/ColorsRepository')
const SizeAdultData = require('../../Repository/MySql/SizeRepository')
const CountryData = require('../../Repository/MySql/CountryRepository')
const CompositionData = require('../../Repository/MySql/CompositionRepository')
const TnvedCodesData = require('../../Repository/MySql/TnvedCodesRepository')
const ProductViewData = require('../../Repository/MySql/ProductViewRepository')

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
        ] = results;

        // Возвращаем объект, в котором данные таблиц являются свойствами
        return {

            banedTradeMarkData: tradeMarkDataResult.status === 'fulfilled' ? tradeMarkDataResult.value : null,
            productViewResult: productViewResult.status === 'fulfilled' ? productViewResult.value : null,
            colorsDataResult: colorsDataResult.status === 'fulfilled' ? colorsDataResult.value : null,
            genderData: genderDataResult.status === 'fulfilled' ? genderDataResult.value : null,
            //   sizesDataResult: sizesDataResult.status === 'fulfilled' ? sizesDataResult.value : null,
            compositionDataResult: compositionDataResult.status === 'fulfilled' ? compositionDataResult.value : null,
            tnvedCodesDataResult: tnvedCodesDataResult.status === 'fulfilled' ? tnvedCodesDataResult.value : null,
            countriesResult: countriesResult.status === 'fulfilled' ? countriesResult.value : null,
        };
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
}

module.exports = {
    fetchData
};


