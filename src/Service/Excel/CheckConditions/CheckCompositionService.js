const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

async function checkComposition(cellComposition, compositionData) {

    let error = null;
    let cellCompositionValue = valueService.getObjectValue(cellComposition);
    if (cellCompositionValue == null) {
        cellStyleService.setError(cellComposition);
        error = cellComposition.address + ' - пустое значение';
        return error;
    }
    if (compositionData && compositionData.length > 0) {
        for (const {value, synonyms} of compositionData) {
            // Создаём массив синонимов, убираем пробелы
            const synonymsArray = synonyms.split(',').map(s => s.trim());

            // Создаём регулярное выражение для поиска синонимов и основного значения
            const regex = new RegExp(
                `(?:${[value, ...synonymsArray].join('|')})`,
                'gi'
            );

            if (typeof cellCompositionValue !== 'string') {
                throw new Error(`${cellComposition.address} - значение не является строкой.`);
            }
            // Заменяем все вхождения синонимов на значение `value`
            let newValue = cellCompositionValue.replace(regex, value).toLowerCase();
            if (newValue !== cellCompositionValue) {
                cellCompositionValue = newValue;
                cellComposition.value = cellCompositionValue;
                //      cellStyleService.setEdit(cellComposition);
            }
        }

        //   for (const {value} of compositionData) {
        // Универсальное регулярное выражение для материалов и процентов
        const percentageRegex = /\d+\s?%/g;

        // Найти все проценты
        let percentageMatches = [...cellCompositionValue.matchAll(percentageRegex)];

        // Извлечь проценты
        let percentages = percentageMatches.map(match => {
            return parseInt(match[0].replace(/\s?%/, '').trim()); // Убираем пробел и символ %
        });

        // Регулярное выражение для поиска всех материалов
        const materialRegex = new RegExp(
            compositionData.map(({value}) => value).join('|'),
            'gi'
        );

        // Найти все материалы
        let materialMatches = [...cellCompositionValue.matchAll(materialRegex)];

        // Количество материалов
        let materialCount = materialMatches.length;

        // Сумма процентов
        let sum = percentages.reduce((acc, curr) => acc + curr, 0);

        // Проверки
        if (materialCount !== percentages.length || sum % 100 !== 0) {
            error = `${cellComposition.address} - ошибка в составе, или отсутствует материал в бд`;
            cellStyleService.setError(cellComposition);
        }
        //    }

    } else {
        throw new Error('Отсутствуют данные бд таблицы Страны');
    }
    return error;
}

module.exports = {checkComposition};