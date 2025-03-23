"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styl3_1 = __importDefault(require("styl3"));
class ChartFormatter {
    colors;
    constructor(options) {
        this.colors = (0, styl3_1.default)({ theme: options.theme });
    }
    colorify(txt, color) {
        if (color) {
            if (color.includes('#')) {
                return this.colors.hex(color) `${txt}`;
            }
            else if (color.match(/[0-9]/)) {
                return this.colors.ansi(color) `${txt}`;
            }
            else if (Array.isArray(color)) {
                return this.colors.rgb(...color) `${txt}`;
            }
            else {
                return this.colors[color] `${txt}`;
            }
        }
        return txt;
    }
    stripStyle(label) {
        return label.replace(/\x1b\[[0-9;]*m/g, '');
    }
}
exports.default = ChartFormatter;
