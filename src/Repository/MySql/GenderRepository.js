const pool = require('../../Service/MySql/MySqlConnectService')

async function getGenderData() {
    const [rows] = await pool.query("SELECT * FROM gender");

    // Преобразуем данные из таблицы в список объектов с нужными свойствами
    const transformedData = await rows.map(row => ({
        id: row.id,
        shortName: row.short_name,
        rightName: row.right_name
    }));

    return transformedData
}

module.exports = {
    getGenderData
}