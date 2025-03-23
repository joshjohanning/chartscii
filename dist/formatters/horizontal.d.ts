import { ChartOptions, ChartData, ChartPoint } from '../types/types';
import ChartFormatter from './formatter';
declare class HorizontalChartFormatter extends ChartFormatter {
    private options;
    constructor(options: ChartOptions);
    pad(space: number): string;
    offsetPercentage(): 0 | 1;
    formatStructure(structChar: string, color?: string): string;
    formatBar(point: ChartPoint, label: string, barHeight: number, padding: number): any;
    formatValueWithDecimals(value: number): string;
    scaleBar(bar: string, value: number, label: string, color: string, barHeight: number, padding: number): string;
    formatFill(point: ChartPoint): string;
    formatPercentage(point: ChartPoint): string;
    formatLabelSpace(label: string): string;
    formatChartLabel(label?: string): any;
    formatChartScale(chart: ChartData): {
        padding: number;
        barHeight: number;
    };
    format(chart: ChartData): string;
    formatLine(point: ChartPoint, barHeight: number, padding: number, isLast: boolean): string;
    formatLabel(point: ChartPoint, key: string): any;
    formatBottom(labels: string[]): string;
}
export default HorizontalChartFormatter;
