const ExcelJS = require("exceljs");
const {Readable} = require('stream');
const CreateServiceDTO = require("./CreateDTOService");
const CheckNameService = require("./CheckConditions/CheckNameService");
const CheckModelService = require("./CheckConditions/CheckArticleService");
const CheckCountService = require("./CheckConditions/CheckCountService");


async function runExelCheck(stream, sheetName) {
    const workbook = await new ExcelJS.Workbook();

    try {
        // Загружаем поток в Workbook
        await workbook.xlsx.read(stream);

        // Получаем нужный лист
        const sheet = await workbook.getWorksheet(sheetName);
        if (!sheet) {
            throw new Error(`Sheet "${sheetName}" not found`);
        }
        // Перебираем строки, начиная с первой
        sheet.eachRow((row, rowNumber) => {
            //   Начинаем с 8-й строки
            if (rowNumber < 8) return;
            let productDTO = CreateServiceDTO.getProductDTO(row);
            validatingChecks(productDTO);
        });
        // Конвертируем Workbook обратно в Base64
        return await workbook.xlsx.writeBuffer();
    } catch (error) {
        console.error('Ошибка при обработке файла:', error.message);
        throw error;
    }

}

function validatingChecks(productDTO) {
    try {
        Promise.all([
            CheckNameService.checkNameMore80(productDTO.name), // 1
            CheckModelService.checkTypeArticle(productDTO.articleType), // 3
            CheckModelService.checkValueArticle(productDTO), // 4
            CheckCountService.checkCellCount(productDTO.count)//13
        ]).then();

    } catch (error) {
        console.error("Error:", error);
    }
}


module.exports = {runExelCheck};

