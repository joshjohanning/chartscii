import { InputData, ChartOptions, ChartData } from '../types/types';
declare class ChartProcessor {
    private options;
    private validator;
    constructor(options: ChartOptions);
    getPointValue(point: InputData): number;
    calculateTotal(data: InputData[]): number;
    calculateData(data: InputData[]): number;
    percentage(value: number, total: number): number;
    scale(value: number): number;
    preprocess(data: InputData[]): {
        processed: InputData[];
        key: string;
        total: number;
    };
    process(data: InputData[]): [ChartData, ChartOptions];
    sort(data: InputData[]): InputData[];
}
export default ChartProcessor;
