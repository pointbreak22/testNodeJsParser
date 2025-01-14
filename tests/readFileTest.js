const fs = require('fs');
const path = require('path');
const readFileService=require('../src/Services/Exel/readFileExel');



// //cчитывание файла

const base64FilePath = path.join(process.cwd(), 'Public/testFile.txt'); // Путь к файлу со строкой Base64
// // Чтение строки Base64
const base64String = fs.readFileSync(base64FilePath, 'utf8'); //
//

readFileService.processLargeExcelFromBase64(base64String, "Одежда");

