const pool = require('../../Service/MySql/MySqlConnectService')

async function getTnvedCodesData() {
    const [rows] = await pool.query("SELECT * FROM codes_tnved_desc");

    // Преобразуем данные из таблицы в список объектов с нужными свойствами
    return await rows.map(row => ({
        id: row.id,
        code: row.code,
        titleProduct: row.title_product,
        typeProduct: row.type_product,
        gender: row.gender,
        typeComposition: row.type_composition,
        composition: row.composition,
    }))
}

module.exports = {
    getTnvedCodesData
}