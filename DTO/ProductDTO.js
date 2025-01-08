
class ProductDTO{
    #code
    #name
    #trademark
    #articleType
    #articleValue
    #productValue
    #colorValue
    #targetFloor
    #clothingSizeType
    #clothingSizeValue
    #composition
    #code2
    #standardNumber
    #city
    #count


    get code() {
        return this.#code;
    }

    set code(value) {
        this.#code = value;
        return this;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get trademark() {
        return this.#trademark;
    }

    set trademark(value) {
        this.#trademark = value;
        return this;
    }

    get articleType() {
        return this.#articleType;
    }

    set articleType(value) {
        this.#articleType = value;
        return this;
    }

    get articleValue() {
        return this.#articleValue;
    }

    set articleValue(value) {
        this.#articleValue = value;
        return this;
    }

    get productValue() {
        return this.#productValue;
    }

    set productValue(value) {
        this.#productValue = value;
        return this;
    }

    get colorValue() {
        return this.#colorValue;
    }

    set colorValue(value) {
        this.#colorValue = value;
        return this;
    }

    get targetFloor() {
        return this.#targetFloor;
    }

    set targetFloor(value) {
        this.#targetFloor = value;
        return this;
    }

    get clothingSizeType() {
        return this.#clothingSizeType;
    }

    set clothingSizeType(value) {
        this.#clothingSizeType = value;
        return this;
    }

    get clothingSizeValue() {
        return this.#clothingSizeValue;
    }

    set clothingSizeValue(value) {
        this.#clothingSizeValue = value;
        return this;
    }

    get composition() {
        return this.#composition;
    }

    set composition(value) {
        this.#composition = value;
        return this;
    }

    get code2() {
        return this.#code2;
    }

    set code2(value) {
        this.#code2 = value;
        return this;
    }

    get standardNumber() {
        return this.#standardNumber;
    }

    set standardNumber(value) {
        this.#standardNumber = value;
        return this;

    }

    get city() {
        return this.#city;
    }

    set city(value) {
        this.#city = value;
        return this;
    }

    get count() {
        return this.#count;
    }

    set count(value) {
        this.#count = value;
        return this;

    }
}

module.exports=ProductDTO;