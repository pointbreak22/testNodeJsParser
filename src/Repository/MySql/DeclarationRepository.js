const pool = require('../../Service/MySql/MySqlConnectService')

async function getDeclarationsData() {
    const [rows] = await pool.query("SELECT * FROM declarations");

    // Преобразуем данные из таблицы в список объектов с нужными свойствами
    return await rows.map(row => ({
        id: row.id,
        orderNumber: row.order_number,
        regulationNumber: row.regulation_number,
        documentNumber: row.document_number,
        dateRegistration: row.date_registration,
        dateCompleted: row.date_completed,
        applicantName: row.applicant_name,
        applicantInn: row.applicant_inn,
        producerName: row.producer_name,
        producerInn: row.producer_inn,
        codeTnvedShort: row.code_tnved_short,
        country: row.country,
    }))
}

module.exports = {
    getDeclarationsData
}