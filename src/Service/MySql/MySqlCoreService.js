const MyTable = require('../../Repository/MySql/TableRepository')
const GenderData = require('../../Repository/MySql/GenderRepository')

async function fetchData() {
    try {
        const results = await Promise.allSettled([
            MyTable.getData(),   // Получаем данные таблицы
            GenderData.getGenderData()  // Получаем данные о генделе
        ]);

        // Обрабатываем результаты
        const [
            myTableDataResult,
            genderDataResult,
        ] = results;


        // Возвращаем объект, в котором myTableData и genderData - это свойства
        return {
            myTableData: myTableDataResult.status === 'fulfilled' ? myTableDataResult.value : null,
            genderData: genderDataResult.status === 'fulfilled' ? genderDataResult.value : null,
        };
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return {
            myTableData: null,
            genderData: null
        };
    }
}

module.exports = {
    fetchData
};


