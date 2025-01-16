const ProductDTO = require("../../DTO/ProductDTO");

function getProductDTO(row) {
    let productDTO = new ProductDTO();
    productDTO.code = row.getCell(1);   //A
    productDTO.name = row.getCell(2);   //B
    productDTO.trademark = row.getCell(3);  //C
    productDTO.articleType = row.getCell(4);    //D
    productDTO.articleValue = row.getCell(5);   //E
    productDTO.productView = row.getCell(6);    //F
    productDTO.colorValue = row.getCell(7);     //G
    productDTO.targetFloor = row.getCell(8);    //H
    productDTO.clothingSizeType = row.getCell(9);   //I
    productDTO.clothingSizeValue = row.getCell(10);     //J
    productDTO.composition = row.getCell(12);   //L
    productDTO.code2 = row.getCell(13);     //M
    productDTO.standardNumber = row.getCell(14);    //N
    productDTO.city = row.getCell(15);     //O
    productDTO.count = row.getCell(16);     //P
    return productDTO;
}

module.exports = {getProductDTO};