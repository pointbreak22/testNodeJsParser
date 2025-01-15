const fillOrange = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFFA500' }, // Оранжевый цвет
};



function setError(cell) {
cell.style = {
    ...(cell.style || {}),
    fill: fillOrange,
};
}


module.exports = {setError}