function getObjectValue(variable) {

    if (variable.value instanceof Object) {
        return variable.value.result ?? null;
    } else {
        return variable.value ?? null;
    }
}

const normalize = (s) => s.toString().toLowerCase().replace(/ё/g, 'е');

function compareStrings(str1, str2) {
    return normalize(str1) === normalize(str2);
}

function normalizedIncludes(str, substring) {
    return normalize(str).includes(normalize(substring));
}

function normalizedSliceIncludes(str, substring) {
    str = normalize(str);
    substring = normalize(substring).slice(0, -2);
    return str.includes(substring);
}

module.exports = {getObjectValue, compareStrings, normalizedIncludes, normalizedSliceIncludes};