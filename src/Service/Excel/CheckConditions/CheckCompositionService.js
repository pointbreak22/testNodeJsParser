const valueService = require('../ValueService');
const cellStyleService = require('../CellStyleService');

// const transportDTO.errorService = require('../transportDTO.errorService');

async function checkComposition(cellComposition, compositionData, transportDTO) {

    let cellCompositionValue = valueService.getObjectValue(cellComposition);
    if (cellCompositionValue == null) {
        cellStyleService.setError(cellComposition);
        transportDTO.errorService.addBug(cellComposition.address + ' - пустое значение');
        return;
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
                transportDTO.errorService.addError(`${cellComposition.address} - значение не является строкой.`);
                return;
            }

            let newValue = cellCompositionValue.replace(regex, value);
            if (valueService.anCompareStrings(newValue, cellCompositionValue)) {
                cellCompositionValue = newValue;
                cellComposition.value = cellCompositionValue;
                cellStyleService.setEdit(cellComposition);
            }
            //   cellComposition.value = cellComposition.value.toLowerCase();
        }

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

        if (materialCount === 1 && percentages.length === 0) {
            cellComposition.value += " 100%";
            cellStyleService.setEdit(cellComposition);
            transportDTO.errorService.addChange(`${cellComposition.address} - значение изменено`);
        }
        // Проверки
        else if (materialCount !== percentages.length || sum % 100 !== 0) {
            transportDTO.errorService.addBug(`${cellComposition.address} - ошибка в составе или отсутствует материал в бд таблицы compositions`);
            cellStyleService.setError(cellComposition);
        }
    } else {
        transportDTO.errorService.addError('Отсутствуют данные бд таблицы compositions');
    }

}

module.exports = {checkComposition};