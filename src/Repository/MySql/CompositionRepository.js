const pool = require('../../Service/MySql/MySqlConnectService')

async function getCompositionData() {
    const [rows] = await pool.query("SELECT * FROM compositions");

    // Преобразуем данные из таблицы в список объектов с нужными свойствами
    return await rows.map(row => ({
        id: row.id,
        value: row.value,
        synonyms: row.synonyms,
    }))
}

module.exports = {
    getCompositionData
}