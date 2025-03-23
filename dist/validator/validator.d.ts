import { ChartOptions, InputData } from '../types/types';
declare class ChartValidator {
    private options;
    constructor(options: ChartOptions);
    error(text: string): Error;
    validate(data: InputData[]): void;
}
export default ChartValidator;
