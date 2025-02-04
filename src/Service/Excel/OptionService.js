const configOptions = require('../../../config.json').Options;

function isDisable(options, checkName) {

    return Object.keys(options).some(key =>
        configOptions.hasOwnProperty(key) &&
        configOptions[key] === checkName &&
        options[key] === 'disable'
    );

}

module.exports = {isDisable};