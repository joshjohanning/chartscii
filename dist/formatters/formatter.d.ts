import { ChartOptions } from '../types/types';
declare abstract class ChartFormatter {
    colors: Record<string, any>;
    constructor(options: ChartOptions);
    colorify(txt: string, color?: string): any;
    stripStyle(label: string): string;
}
export default ChartFormatter;
