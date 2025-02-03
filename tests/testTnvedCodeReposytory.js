const TnvedCodesRepository = require("../src/Repository/MySql/TnvedCodesRepository")
const fs = require("fs");
const pool = require("../src/Service/MySql/MySqlConnectService");

async function getTnvedCodesData() {

    const [rows] = await pool.query("SELECT codes_tnved_desc.id, \
    codes_tnved_desc.code, \
    codes_tnved_desc.type_product, \
    codes_tnved_desc.gender, \
    codes_tnved_desc.type_composition, \
    types_composition.value AS type_compositionValue \
    FROM codes_tnved_desc \
    left join types_composition on codes_tnved_desc.type_composition \
    is not null \
    and  REPLACE(TRIM(codes_tnved_desc.type_composition),':','') LIKE CONCAT('%',REPLACE(TRIM(types_composition.category), ',', '%'),'%') \
    \
    ");
    return rows;
}

//  AND FIND_IN_SET(REPLACE(TRIM(codes_tnved_desc.type_composition), ':', ''), REPLACE(TRIM(types_composition.category), ',', '')) > 0

getTnvedCodesData().then(values => {
    console.log(values)
    fs.writeFileSync('testFiles/values.txt', JSON.stringify(values, null, 2)); // сохраняем лог в файл

})

