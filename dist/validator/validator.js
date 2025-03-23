"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChartValidator {
    options;
    constructor(options) {
        this.options = options;
    }
    error(text) {
        return new Error(text);
    }
    validate(data) {
        if (!Array.isArray(data))
            throw new Error("Input data must be an array");
        if (typeof data[0] === "string")
            throw new Error("Input values must be numbers. e.g [1, 2, 3] or [{value: 1}, {value: 2}]");
        if (!data.length)
            throw new Error('No data provided');
        if (this.options.barSize === 0)
            throw new Error('barSize cannot be 0');
    }
}
exports.default = ChartValidator;
