function getClotheDTO(row) {
    return {
        code: row.getCell(1),  //A
        name: row.getCell(2),   //B
        trademark: row.getCell(3),  //C
        articleType: row.getCell(4),    //D
        articleValue: row.getCell(5),   //E
        productView: row.getCell(6),    //F
        colorValue: row.getCell(7),     //G
        targetFloor: row.getCell(8),    //H
        clothingSizeType: row.getCell(9),   //I
        clothingSizeValue: row.getCell(10),     //J
        composition: row.getCell(12),   //L
        code2: row.getCell(13),     //M
        standardNumber: row.getCell(14),    //N
        city: row.getCell(15),     //O
        count: row.getCell(16),     //P
    };
}

module.exports = {getClotheDTO};