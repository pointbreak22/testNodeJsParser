const pool = require('../../Service/MySql/MySqlConnectService')

async function getSizeAdultData() {
    const [rows] = await pool.query("SELECT * FROM sizes_adult");

    // Преобразуем данные из таблицы в список объектов с нужными свойствами
    return await rows.map(row => ({
        id: row.id,
        category: row.category,
        type: row.type,
        value: row.value,
    }))
}

module.exports = {
    getSizeAdultData
}