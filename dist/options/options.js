"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = void 0;
exports.defaultOptions = {
    percentage: false,
    colorLabels: false,
    sort: false,
    reverse: false,
    color: undefined,
    title: '',
    labels: true,
    char: '█',
    naked: false,
    width: 100,
    height: 10,
    padding: 0,
    orientation: 'horizontal',
    theme: '',
    scale: 'auto',
    structure: {
        x: '═',
        y: '╢',
        axis: '║',
        topLeft: '╔',
        bottomLeft: '╚',
    },
};
class Options {
    constructor(options) {
        const config = {
            ...exports.defaultOptions,
            ...options,
            max: {
                label: 0,
                value: 0,
                scaled: 0
            },
            structure: {
                ...exports.defaultOptions.structure,
                ...options?.structure
            }
        };
        return config;
    }
}
exports.default = Options;
// fills: ░, ▒, ▓
// chars: ▀, ▁, ▂, ▃, ▄, ▅, ▆, ▇, █, ▉, ▊, ▋, ▌, ▍, ▎, ▏, ▐, ▔, ▕, ▖, ▗, ▘, ▙, ▚, ▛, ▜, ▝, ▞, ▟
