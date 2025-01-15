const pool = require('../../Service/MySql/MySqlConnectService')

async function getData() {
    const [rows] = await pool.query("SELECT * FROM new_table");

    return rows
}

module.exports = {
    getData
}