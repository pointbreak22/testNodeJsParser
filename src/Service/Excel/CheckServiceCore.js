const ClothesCheckService = require('./Items/Clothes/CheckService');
const FootwearCheckService = require('./Items/Footwear/CheckService');

// Определяем объект с методами
const CheckService = (row, dbData) => ({
    clothes: () => ClothesCheckService.getClothesChecks(row, dbData),
    footwear: () => FootwearCheckService.getFootwearChecks(row, dbData),
});

// Экспортируем объект
module.exports = CheckService;