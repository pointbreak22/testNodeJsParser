const pool = require('../../Service/MySql/MySqlConnectService')

async function getProductViewData() {
    const [rows] = await pool.query("SELECT * FROM types_clothing");

    // Преобразуем данные из таблицы в список объектов с нужными свойствами
    return await rows.map(row => ({
        id: row.id,
        value: row.value,
        category: row.category,
    }))
}

module.exports = {
    getProductViewData
}