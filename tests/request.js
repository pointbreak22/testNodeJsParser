const fs = require('fs');
const path = require("path");

// Чтение файла и конвертация в Base64
const filePath = path.join(process.cwd(), 'testFiles/testFileExel.xlsx');  // Укажите путь к файлу
const fileBuffer = fs.readFileSync(filePath);
const fileBase64 = fileBuffer.toString('base64');

const newExcelFilePath = path.join(process.cwd(), 'testFiles/restored_example.xlsx'); // Путь для сохранения Excel файла

fetch('http://localhost:3000/check-file', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        type: 'clothes',
        base64: fileBase64  // Передайте строку Base64
    }),
})
    .then(response => response.json())
    .then(data => {
        try {
            console.log(
                {
                    bugs: data.bugs,
                    errors: data.errors
                });
            const fileBuffer = Buffer.from(data.base24, 'base64');
            // Запись буфера в файл Excel
            fs.writeFileSync(newExcelFilePath, fileBuffer);
            console.log(`Файл успешно восстановлен из Base64 и сохранён в: ${newExcelFilePath}`);
        } catch (error) {
            console.error('Error during file processing:', error);
        }

    })
    .catch(error => console.error('Error:', error));