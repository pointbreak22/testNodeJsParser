const GenderData = require('../../Repository/MySql/GenderRepository')
const TradeMarkData = require('../../Repository/MySql/TradeMarkRepository');
const ColorsData = require('../../Repository/MySql/ColorsRepository')
const SizeAdultData = require('../../Repository/MySql/SizeAdultRepository')
const CountryData = require('../../Repository/MySql/CountryRepository')
const CompositionData = require('../../Repository/MySql/CompositionRepository')

async function fetchData() {
    try {
        const results = await Promise.allSettled([
            GenderData.getGenderData(),  // Получаем данные о генделе №7
            TradeMarkData.getBanedBrandsData(), //получаем черный список для "товарный знак" №2
            ColorsData.getColorsData(),  //№6 цвета
            SizeAdultData.getSizeAdultData(), // №8 не работает
            CountryData.getCountryData(), //db Country №12
            CompositionData.getCompositionData(), // db compositions №9

        ]);

        // Обрабатываем результаты
        const [
            genderDataResult,
            tradeMarkDataResult,
            colorsDataResult,
            sizesDataResult,
            countriesResult,
            compositionDataResult,
        ] = results;

        // Возвращаем объект, в котором данные таблиц являются свойствами
        return {
            genderData: genderDataResult.status === 'fulfilled' ? genderDataResult.value : null,
            banedTradeMarkData: tradeMarkDataResult.status === 'fulfilled' ? tradeMarkDataResult.value : null,
            colorsDataResult: colorsDataResult.status === 'fulfilled' ? colorsDataResult.value : null,
            sizesDataResult: sizesDataResult.status === 'fulfilled' ? sizesDataResult.value : null,
            countriesResult: countriesResult.status === 'fulfilled' ? countriesResult.value : null,
            compositionDataResult: compositionDataResult.status === 'fulfilled' ? compositionDataResult.value : null,
        };
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
}

module.exports = {
    fetchData
};


