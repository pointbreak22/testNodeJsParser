const fillOrange = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: {argb: 'FFFFA500'}, // Оранжевый цвет
};

const fillGreen = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: {argb: 'F00FF00'}, // Оранжевый цвет
};

function setError(cell) {
    cell.style = {
        ...(cell.style || {}),
        fill: fillOrange,
    };
}

function setEdit(cell) {
    cell.style = {
        ...(cell.style || {}),
        fill: fillGreen,
    };
}

module.exports = {setError, setEdit};