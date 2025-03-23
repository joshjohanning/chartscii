import { InputData, CustomizationOptions } from './types/types';
declare class Chartscii {
    private chart;
    private asciiChart;
    constructor(data: InputData[], options?: CustomizationOptions);
    create(): string;
}
export default Chartscii;
