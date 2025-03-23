"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("../validator/validator"));
class ChartProcessor {
    options;
    validator;
    constructor(options) {
        this.validator = new validator_1.default(options);
        this.options = options;
    }
    getPointValue(point) {
        return typeof point === "number" ? point : point.value;
    }
    calculateTotal(data) {
        return data.reduce((a, p) => {
            const value = this.getPointValue(p);
            return a + value;
        }, 0);
    }
    calculateData(data) {
        const total = this.calculateTotal(data);
        return data.reduce((a, p) => {
            const value = this.getPointValue(p);
            const label = typeof p === "number" ? p.toString() : (p.label || p.value.toString());
            const percentage = this.percentage(value, total);
            const percentageLength = percentage ? percentage.toFixed(2).length + 5 : 0;
            const maxLabelLength = this.options.percentage ? label.length + percentageLength : label.length;
            if (this.options.labels)
                this.options.max.label = Math.max(maxLabelLength, this.options.max.label);
            this.options.max.value = Math.max(value, this.options.max.value);
            this.options.max.scaled = Math.max(this.scale(value), this.options.max.scaled);
            return a + value;
        }, 0);
    }
    percentage(value, total) {
        if (this.options.percentage) {
            const avg = value / total;
            return avg * 100;
        }
        return 0;
    }
    scale(value) {
        const size = this.options.orientation === 'vertical' ? this.options.height : this.options.width;
        const { scale, max } = this.options;
        if (scale === "auto") {
            return Math.round((value / max.value) * size);
        }
        else if (typeof scale === "number" && scale > 0) {
            return Math.round(value / scale);
        }
        else {
            return value;
        }
    }
    preprocess(data) {
        const sorted = this.sort(data);
        const key = this.options.structure.y;
        const total = this.calculateData(data);
        const processed = this.options.reverse ? sorted.reverse() : sorted;
        return { processed, key, total };
    }
    process(data) {
        const { processed, total } = this.preprocess(data);
        this.validator.validate(data);
        const chartData = new Map();
        processed.forEach((point, i) => {
            const { color = this.options.color, label: pointLabel, value } = typeof point === "number" ? { value: point, label: point.toString() } : point;
            const scaled = Number(this.scale(value).toFixed(2));
            const percentage = this.percentage(value, total);
            const label = pointLabel || value.toString();
            const formattedPoint = {
                label,
                value,
                color,
                scaled,
                percentage
            };
            chartData.set(i, formattedPoint);
        });
        return [chartData, this.options];
    }
    sort(data) {
        if (this.options.sort) {
            return data.sort((a, b) => {
                const first = this.getPointValue(a);
                const second = this.getPointValue(b);
                return first - second;
            });
        }
        return data;
    }
}
exports.default = ChartProcessor;
