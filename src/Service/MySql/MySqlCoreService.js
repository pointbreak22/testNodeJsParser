const GenderData = require('../../Repository/MySql/GenderRepository')
const TradeMarkData = require('../../Repository/MySql/TradeMarkRepository');
const ColorsData = require('../../Repository/MySql/ColorsRepository')
const SizeAdultData = require('../../Repository/MySql/SizeAdultRepository')

async function fetchData() {
    try {
        const results = await Promise.allSettled([
            GenderData.getGenderData(),  // Получаем данные о генделе
            TradeMarkData.getBanedBrandsData(), //получаем черный список для "товарный знак"
            ColorsData.getColorsData(),
            SizeAdultData.getSizeAdultData(),

        ]);

        // Обрабатываем результаты
        const [
            genderDataResult,
            tradeMarkDataResult,
            colorsDataResult,
            sizesDataResult,
        ] = results;

        // Возвращаем объект, в котором myTableData и genderData - это свойства
        return {
            genderData: genderDataResult.status === 'fulfilled' ? genderDataResult.value : null,
            banedTradeMarkData: tradeMarkDataResult.status === 'fulfilled' ? tradeMarkDataResult.value : null,
            colorsDataResult: colorsDataResult.status === 'fulfilled' ? colorsDataResult.value : null,
            sizesDataResult: sizesDataResult.status === 'fulfilled' ? sizesDataResult.value : null,
        };
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return {
            genderData: null,
            banedTradeMarkData: null,
            colorsDataResult: null,
            sizesDataResult: null,
        };
    }
}

module.exports = {
    fetchData
};


