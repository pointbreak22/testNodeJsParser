const {Readable} = require('stream');
const CheckExelService = require('./Excel/ExelServiceCore');

async function startCheck(base64String, sheetName) {
    if (!base64String || typeof base64String !== 'string') {
        throw new Error('Invalid Base64 string');
    }
    const buffer = Buffer.from(base64String, 'base64');

    // Создаем поток Readable
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Сообщаем о завершении потока

    let result = {};
    if (checkExcelFile(buffer)) {
        result = await CheckExelService.runExelCheck(stream, sheetName);
    }
    result.base24 = result.buffer.toString('base64');
    delete result.buffer;
    return result;
}

function checkExcelFile(buffer) {
    const magicBytes = buffer.slice(0, 4).toString('hex');
    // XLSX файлы начинаются с '50 4B 03 04'
    return magicBytes === '504b0304';
}

module.exports = {
    startCheck,
}