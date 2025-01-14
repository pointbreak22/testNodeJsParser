const checkFullName = require('../src/Services/Exel/CheckConditions/CheckFullNameService');
const convertBase24Service = require('../src/Services/Exel/ConvertBase24Service')
const path = require("path");
const fs = require("fs");


const oldExcelFilePath = path.join(process.cwd(), 'Public/testFileExel.xlsx'); // Путь для сохранения Excel файла
const Base64FilePath = path.join(process.cwd(), 'Public/testFile.txt');  // Путь к файлу со строкой Base64
const newExcelFilePath = path.join(process.cwd(), 'Public/restored_example.xlsx'); // Путь для сохранения Excel файла


try {
    let base64String = fs.readFileSync(Base64FilePath, 'utf8');
    checkFullName.checkMore80Symbol(base64String, "Одежда").then((newBase64String)=>{
        const fileBuffer = Buffer.from(newBase64String, 'base64');
        // Запись буфера в файл Excel
        fs.writeFileSync(newExcelFilePath, fileBuffer);
        console.log(`Файл успешно восстановлен из Base64 и сохранён в: ${newExcelFilePath}`);
    });
    // Конвертация строки Base64 в буфер

} catch (error) {
    console.error('Ошибка при восстановлении файла:', error.message);
}






