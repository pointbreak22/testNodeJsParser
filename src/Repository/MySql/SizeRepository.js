const pool = require('../../Service/MySql/MySqlConnectService')

async function getSizeAdultData() {
    const [rows] = await pool.query(selectText);

    // Преобразуем данные из таблицы в список объектов с нужными свойствами
    return await rows.map(row => ({
        id: row.id,
        category: row.category,
        type: row.type,
        value: row.value,
    }))
}

const selectText = "SELECT \
    'РОССИЯ' AS type, \
    value, \
   'adult' AS category \
    FROM sizes_adult_brassiere \
    UNION ALL SELECT \
   'ОГ (см)' AS type, \
   value, \
   'adult' AS category \
    FROM sizes_adult_breast \
    UNION ALL SELECT \
   'РОССИЯ' AS type, \
   value, \
   'adult' AS category \
    FROM sizes_adult_general \
    UNION ALL SELECT \
   'США, Европа, Китай' AS type, \
   value, \
   'adult' AS category \
    FROM sizes_adult_general_us_eu_ch \
    UNION ALL SELECT \
   'Международный' AS type, \
   value, \
   'adult' AS category \
    FROM sizes_adult_general_world;"
//child

module.exports = {
    getSizeAdultData
}