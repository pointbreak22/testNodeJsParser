const pool = require('../../Service/MySql/MySqlConnectService')

async function getCountryData() {
    const [rows] = await pool.query("SELECT * FROM countries");

    // Преобразуем данные из таблицы в список объектов с нужными свойствами
    return await rows.map(row => ({
        id: row.id,
        code: row.code,
        country: row.country,
        correct: row.correct,
    }))
}

module.exports = {
    getCountryData
}