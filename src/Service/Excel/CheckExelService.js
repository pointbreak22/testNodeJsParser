const ExcelJS = require("exceljs");
const {Readable} = require('stream');
const CreateServiceDTO = require("./CreateDTOService");
const CheckNameService = require("./CheckConditions/CheckNameService");
const CheckModelService = require("./CheckConditions/CheckArticleService");
const CheckCountService = require("./CheckConditions/CheckCountService");
const CheckGenderService = require("./CheckConditions/CheckGenderService");
const CheckTradeMarkService = require("./CheckConditions/CheckTradeMarkService");
const CheckColorService = require("./CheckConditions/CheckColorService");
const CheckSizeAdultService = require("./CheckConditions/CheckSizeAdultService");


const MySqlCoreService = require("../MySql/MySqlCoreService");


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

        const dbData = await MySqlCoreService.fetchData();  // Получаем данные


        // Перебираем строки, начиная с первой
        sheet.eachRow((row, rowNumber) => {
            //   Начинаем с 8-й строки
            if (rowNumber < 8) return;
            let productDTO = CreateServiceDTO.getProductDTO(row);
            validatingChecks(productDTO, dbData);
        });
        // Конвертируем Workbook обратно в Base64
        return await workbook.xlsx.writeBuffer();
    } catch (error) {
        console.error('Ошибка при обработке файла:', error.message);
        throw error;
    }

}

function validatingChecks(productDTO, dbData) {
    try {
        Promise.all([
            CheckNameService.checkNameMore80(productDTO.name), // 1
            CheckTradeMarkService.checkTradeMarks(productDTO.trademark, dbData.banedTradeMarkData), //2
            CheckModelService.checkTypeArticle(productDTO.articleType), // 3
            CheckModelService.checkValueArticle(productDTO), // 4
            CheckColorService.checkColor(productDTO.colorValue, dbData.colorsDataResult), //6
            CheckGenderService.checkGender(productDTO.targetFloor, dbData.genderData), //7
            CheckSizeAdultService.checkSizeAdults(productDTO, dbData.sizesDataResult), //8
            CheckCountService.checkCellCount(productDTO.count),//13

        ]).then();

    } catch (error) {
        console.error("Error:", error);
    }
}


module.exports = {runExelCheck};

