const fillRed = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: {argb: 'FFFF0000'}, // Оранжевый цвет
};

const fillGreen = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: {argb: 'F00FF00'}, // Оранжевый цвет
};

const fontBlack = {
    color: {argb: 'FF000000'}, // Чёрный цвет для текста
};

function setError(cell) {
    cell.style = {
        ...(cell.style || {}),
        fill: fillRed,
    };
}

function setEdit(cell) {
    cell.style = {
        ...(cell.style || {}),
        fill: fillGreen,
        font: fontBlack,
    };
}

module.exports = {setError, setEdit};