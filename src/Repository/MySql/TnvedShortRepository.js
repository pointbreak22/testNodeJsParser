const pool = require('../../Service/MySql/MySqlConnectService')

async function getTnvedShortData() {
    const [rows] = await pool.query("SELECT * FROM codes_tnved_short");

    // Преобразуем данные из таблицы в список объектов с нужными свойствами
    return await rows.map(row => ({
        id: row.id,
        value: row.value,
    }))
}

module.exports = {
    getTnvedShortData
}