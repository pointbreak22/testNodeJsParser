const MyTable = require('../../Repository/MySql/TableRepository')
const GenderData = require('../../Repository/MySql/GenderRepository')

async function fetchData() {
    try {
        // Получаем данные асинхронно
        const myTableData = await MyTable.getData(); // Получаем данные таблицы
        const genderData = await GenderData.getGenderData(); // Получаем данные о гендере

        // Возвращаем объект, в котором myTableData и genderData - это свойства
        return {
            myTableData,
            genderData
        };
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

module.exports = {
    fetchData
};


