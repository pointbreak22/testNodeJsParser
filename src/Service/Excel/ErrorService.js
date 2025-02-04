class ErrorService {

    constructor() {
        this.errors = [];
        this.bugs = [];
        this.changes = [];
        this.mains = [];
    }

    addError(error) {
        this.errors.push(error);
    }

    addBug(bug) {
        this.bugs.push(bug);
    }

    addChange(change) {
        this.changes.push(change);
    }

    addMain(main) {
        this.mains.push(main);
    }

    getErrors() {
        return {
            log: {
                changes: [...new Set(this.changes)],
                bugs: [...new Set(this.bugs)],
                main: [...new Set(this.mains)],
            },
            errors: [...new Set(this.errors)],
        };
    }

    clearErrors() {
        this.errors.length = 0;
        this.bugs.length = 0;
        this.changes.length = 0;
        this.mains.length = 0;
    }
}

module.exports = ErrorService;