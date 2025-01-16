const pool = require('../../Service/MySql/MySqlConnectService')

async function getColorsData() {
    const [rows] = await pool.query("SELECT * FROM colors");

    // Преобразуем данные из таблицы в список объектов с нужными свойствами
    return await rows.map(row => ({
        id: row.id,
        value: row.value,
    }))
}

module.exports = {
    getColorsData
}