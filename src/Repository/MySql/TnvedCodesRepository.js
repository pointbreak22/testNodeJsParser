const pool = require('../../Service/MySql/MySqlConnectService')

async function getTnvedCodesData() {
    const [rows1] = await pool.query("SELECT codes_tnved_desc.id, \
        codes_tnved_desc.code, \
        codes_tnved_desc.type_product, \
        codes_tnved_desc.gender, \
        codes_tnved_desc.type_composition \
        FROM codes_tnved_desc");

    // Преобразуем данные из таблицы в список объектов с нужными свойствами
    const tnvedDesc = await rows1
        .map(row => ({
            id: row.id,
            code: row.code,
            typeProduct: row.type_product,
            gender: row.gender,
            typeComposition: row.type_composition,
        }))

    const [rows2] = await pool.query("SELECT types_composition.id, \
        types_composition.value, \
        types_composition.category \
        FROM types_composition");

    const typesComposition = rows2.map(row => ({
        id: row.id,
        value: row.value,
        category: row.category
    }))

    return {tnvedDesc, typesComposition};
}

module.exports = {
    getTnvedCodesData
}

// const [rows] = await pool.query("SELECT codes_tnved_desc.id, \
//     codes_tnved_desc.code, \
//     codes_tnved_desc.type_product, \
//     codes_tnved_desc.gender, \
//     codes_tnved_desc.type_composition, \
//     types_composition.value AS type_compositionValue \
//     FROM codes_tnved_desc \
//     left join types_composition on codes_tnved_desc.type_composition \
//     is not null \
//     AND FIND_IN_SET(REPLACE(TRIM(codes_tnved_desc.type_composition), ':', ''), REPLACE(TRIM(types_composition.category), ',', '')) > 0 \
//     \
//     ");
// and  REPLACE(TRIM(codes_tnved_desc.type_composition),':','') LIKE CONCAT('%',REPLACE(TRIM(types_composition.category), ',', '%'),'%')
