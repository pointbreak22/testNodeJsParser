const ClothesCheckService = require('./Items/Clothes/CheckService');
const FootwearCheckService = require('./Items/Footwear/CheckService');

// Определяем объект с методами
const CheckService = (row, dbData) => ({
    clothes: () => ClothesCheckService.getClothesChecks(row, dbData),
    // footwear: () => throw new Error(`Неверная категория файла`),
});

// Экспортируем объект
module.exports = CheckService;