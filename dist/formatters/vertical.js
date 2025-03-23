"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatter_1 = __importDefault(require("./formatter"));
class VerticalChartFormatter extends formatter_1.default {
    chart;
    options;
    constructor(chart, options) {
        super(options);
        this.chart = [...chart.values()];
        this.options = options;
    }
    format() {
        const maxHeight = this.getMaxHeight();
        const { barWidth, padding } = this.formatChartScale(this.chart.length);
        const verticalChart = this.buildVerticalChart(maxHeight, padding);
        this.formatChart(verticalChart, maxHeight, padding, barWidth);
        return this.composeFinalChart(verticalChart, barWidth, padding);
    }
    formatChartScale(length) {
        const charWidth = this.options.char.length;
        const defaultBarSize = this.options.barSize || 1;
        const calculatedBarWidth = Math.floor((this.options.width / (defaultBarSize * length)) / charWidth) + 1;
        const barSize = this.options.barSize === undefined ? calculatedBarWidth : this.options.barSize;
        const calculatedPadding = Math.round((this.options.width / this.chart.length) / charWidth);
        const defaultPadding = calculatedPadding <= barSize ? 0 : calculatedPadding - barSize;
        const padding = this.options.padding || defaultPadding;
        const barWidth = barSize;
        return { padding, barWidth };
    }
    getMaxHeight() {
        const height = this.options.height + ((this.options.valueLabels && !this.options.fill) ? 1 : 0);
        const maxValue = this.options.scale === "auto" ? height : this.options.scale;
        return height;
    }
    isLongChar() {
        return this.options.char.length > 1;
    }
    isFillLonger() {
        const length = this.options.fill?.length || 0;
        return length && (length > this.options.char.length);
    }
    getFillChar() {
        const { fill, char } = this.getCharLengths();
        return fill > 0 && fill < char ? this.options.fill.repeat(char) : this.options.fill;
    }
    getCharLengths() {
        const char = this.options.char.length;
        const fill = this.options.fill?.length || 0;
        return { char, fill };
    }
    getCharWidth() {
        return this.isLongChar() ? this.options.char.length : (this.isFillLonger() ? this.options.fill.length : 1);
    }
    getScaledBarSize(barSize) {
        const { char, fill } = this.getCharLengths();
        if (fill > 1 && char > 1) {
            return barSize;
        }
        if (this.isFillLonger()) {
            return Math.round(barSize / fill);
        }
        return barSize;
    }
    buildVerticalChart(maxHeight, padding) {
        return Array(maxHeight).fill('').map(() => Array(this.chart.length).fill('').map(() => ' '.repeat(padding)));
    }
    formatChart(verticalChart, maxHeight, padding, barSize) {
        this.chart.forEach((point, index) => {
            const value = point.scaled;
            const height = Math.round((value / maxHeight) * maxHeight);
            const color = point.color;
            for (let i = 0; i < maxHeight; i++) {
                if (i === maxHeight - height - 1 && this.options.valueLabels && !this.options.fill) {
                    const label = this.formatValueLabel(point);
                    const space = barSize - this.stripStyle(label).length + padding;
                    verticalChart[i][index] = label + ' '.repeat(space);
                }
                else if (i < maxHeight - height) {
                    const spaces = this.formatSpace(barSize, padding);
                    const fill = this.formatFill(barSize, padding, color);
                    const fills = this.options.fill ? fill : spaces;
                    verticalChart[i][index] = fills;
                }
                else {
                    const bars = this.formatBar(barSize, padding, color);
                    verticalChart[i][index] = bars;
                }
            }
        });
    }
    formatPercentage(point) {
        if (this.options.percentage) {
            return `(${point.percentage.toFixed(2)}%)`;
        }
        return '';
    }
    formatSpace(barSize, padding) {
        const character = ' ';
        const isOdd = this.isLongChar() ? barSize * this.options.char.length : barSize;
        return character.repeat(isOdd) + character.repeat(padding);
    }
    formatBar(barSize, padding, color) {
        const character = this.options.char;
        const barWidth = this.isFillLonger() ? barSize + (this.options.fill.length - character.length) : this.getScaledBarSize(barSize);
        const value = character.repeat(barWidth) + ' '.repeat(padding);
        return color ? this.colorify(value, color) : value;
    }
    formatFill(barSize, padding, color) {
        const character = this.getFillChar();
        if (character) {
            const barWidth = this.getScaledBarSize(barSize);
            const value = character.repeat(barWidth) + ' '.repeat(padding);
            return color ? this.colorify(value, color) : value;
        }
    }
    formatLabel(point) {
        const label = point.percentage ? `${point.label} ${this.formatPercentage(point)}` : point.label;
        if (this.options.colorLabels) {
            const color = point.color || this.options.color;
            const coloredLabel = color ? this.colorify(label, color) : label;
            return coloredLabel;
        }
        return label;
    }
    formatValueLabel(point) {
        const value = this.formatValueWithDecimals(point.value).toString();
        if (this.options.colorLabels) {
            const color = point.color || this.options.color;
            const coloredLabel = color ? this.colorify(value, color) : value;
            return coloredLabel;
        }
        return value;
    }
    formatLabels(barSize, padding) {
        const formatted = [];
        this.chart.forEach((point, i) => {
            if (this.options.labels) {
                const formattedLabel = this.formatLabel(point);
                const label = this.stripStyle(formattedLabel);
                const charLength = this.getCharWidth();
                const barWidth = this.isLongChar() ? barSize * charLength + padding : barSize + padding + Math.floor(charLength / 2);
                const rightPad = Math.abs(barWidth - label.length);
                const isFirst = i === 0 && !this.options.naked ? 1 : 0;
                formatted.push(' '.repeat(isFirst) + formattedLabel + ' '.repeat(rightPad));
            }
        });
        return formatted.join('');
    }
    formatValueLabels(barSize, padding) {
        const formatted = [];
        this.chart.forEach((point, i) => {
            if (this.options.labels) {
                const formattedLabel = this.formatValueLabel(point);
                const label = this.stripStyle(formattedLabel);
                const charLength = this.getCharWidth();
                const barWidth = this.isLongChar() ? barSize * charLength + padding : barSize + padding + Math.floor(charLength / 2);
                const rightPad = Math.abs(barWidth - label.length);
                const isFirst = i === 0 && !this.options.naked ? 1 : 0;
                formatted.push(' '.repeat(isFirst) + formattedLabel + ' '.repeat(rightPad));
            }
        });
        return formatted.join('');
    }
    composeFinalChart(verticalChart, barSize, padding) {
        const chart = verticalChart.map(row => {
            if (!this.options.naked) {
                return this.options.structure.axis + row.join('');
            }
            return row.join('');
        });
        if (this.options.title) {
            chart.unshift(this.formatChartTitle());
        }
        if (!this.options.naked) {
            chart.push(this.formatBottom(barSize, padding));
        }
        else if (this.options.naked && this.options.labels) {
            chart.push('');
        }
        if (this.options.labels) {
            chart.push(this.formatLabels(barSize, padding));
        }
        if (this.options.valueLabels && this.options.fill) {
            chart.unshift('');
            chart.unshift(this.formatValueLabels(barSize, padding));
        }
        return chart.join('\n');
    }
    formatChartTitle() {
        const color = this.options.color;
        return this.colorify(this.options.title, color);
    }
    formatBottom(barSize, padding) {
        const charLength = this.getCharWidth();
        const barWidth = this.getScaledBarSize(barSize);
        const width = ((barWidth * charLength + padding) * this.chart.length) - padding;
        return this.options.structure.bottomLeft + this.options.structure.x.repeat(width);
    }
    formatValueWithDecimals(value) {
        let formattedValue = value;
        if (this.options.valueLabelsDecimalPlaces !== undefined) {
            formattedValue = value.toFixed(this.options.valueLabelsDecimalPlaces);
        }
        // Add prefix if specified
        if (this.options.valueLabelPrefix) {
            return `${this.options.valueLabelPrefix}${formattedValue}`;
        }
        return String(formattedValue);
    }
}
exports.default = VerticalChartFormatter;
// CURRENTLY UNSUPPORTED
// PERCENTAGE
