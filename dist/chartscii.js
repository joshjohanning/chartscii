"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const horizontal_1 = __importDefault(require("./formatters/horizontal"));
const processor_1 = __importDefault(require("./processor/processor"));
const options_1 = __importDefault(require("./options/options"));
const vertical_1 = __importDefault(require("./formatters/vertical"));
class Chartscii {
    chart;
    asciiChart;
    constructor(data, options) {
        const config = new options_1.default(options);
        const processor = new processor_1.default(config);
        const [chart, processedOptions] = processor.process(data);
        this.chart = chart;
        const chartFormatter = config.orientation === 'vertical'
            ? new vertical_1.default(chart, processedOptions)
            : new horizontal_1.default(processedOptions);
        this.asciiChart = chartFormatter.format(this.chart);
    }
    create() {
        return this.asciiChart;
    }
}
exports.default = Chartscii;
