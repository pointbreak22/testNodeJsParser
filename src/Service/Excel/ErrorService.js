let errors = [];
let bugs = [];
let changes = [];
let mains = [];

function addError(error) {
    errors.push(error);
}

function addBug(bug) {
    bugs.push(bug);
}

function addChange(change) {
    changes.push(change);
}

function addMain(main) {
    mains.push(main);
}

function getErrors() {
    return {
        log: {
            changes: [...new Set(changes)],
            bugs: [...new Set(bugs)],
            main: [...new Set(mains)],
        },
        errors: [...new Set(errors)],
    };
}

function clearErrors() {
    errors.length = 0;
    bugs.length = 0;
    changes.length = 0;
    mains.length = 0;
}

module.exports = {
    addError,
    addBug,
    addChange,
    addMain,
    getErrors,
    clearErrors,
}