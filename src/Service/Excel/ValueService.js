function getObjectValue(variable) {


    if (variable.value instanceof Object) {
        return variable.value.result ?? null;
    } else {
        return variable.value ?? null;
    }
}

module.exports = {getObjectValue};