const {Readable} = require('stream');
const CheckExelService = require('./Excel/ExelServiceCore');

async function startCheck(base64String, sheetName, transportDTO) {
    try {
        if (!base64String || typeof base64String !== 'string') {
            throw new Error('Invalid Base64 string');
        }
        let buffer = Buffer.from(base64String, 'base64');

        // Создаем поток Readable
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null); // Сообщаем о завершении потока

        if (checkExcelFile(buffer)) {
            buffer = await CheckExelService.runExelCheck(stream, sheetName, transportDTO);
        }
        return buffer.toString('base64');
    } catch (error) {
        throw error;
    }
}

function checkExcelFile(buffer) {
    const magicBytes = buffer.slice(0, 4).toString('hex');
    // XLSX файлы начинаются с '50 4B 03 04'
    return magicBytes === '504b0304';
}

module.exports = {
    startCheck,
}