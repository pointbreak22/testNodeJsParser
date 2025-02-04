const ClothesCheckService = require('./Items/Clothes/CheckService');
const FootwearCheckService = require('./Items/Footwear/CheckService');

// Определяем объект с методами
const CheckService = (row, dbData, transportDTO) => ({
    clothes: () => ClothesCheckService.getClothesChecks(row, dbData, transportDTO),
    // footwear: () => throw new Error(`Неверная категория файла`),
});

// Экспортируем объект
module.exports = CheckService;