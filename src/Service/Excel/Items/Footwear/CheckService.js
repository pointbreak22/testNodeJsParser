const DTOService = require("./DTOService");

function getFootwearChecks(row, dbData) {
    const clotheDTO = DTOService.getClotheDTO(row);
    return []
}

module.exports = {getFootwearChecks};