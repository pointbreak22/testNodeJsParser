const configOptions = require('../../../config.json').Options;

function isDisable(options, checkName) {
// { condition_1: 'disable', condition_2: 'disable' }
    //console.log(options);
    return Object.keys(options).some(key =>
        configOptions.hasOwnProperty(key) &&
        configOptions[key] === checkName &&
        options[key] === 'disable'
    );

}

module.exports = {isDisable};