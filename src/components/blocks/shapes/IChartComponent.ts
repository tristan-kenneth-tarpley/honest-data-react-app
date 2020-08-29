import { IFilterable, IMetric } from "../../../types";
import { DayRange } from "react-modern-calendar-datepicker";

interface IChartComponent {
  metrics: Array<IMetric>;
  data: any;
  to: DayRange["to"];
  from: DayRange["from"];
  chartType: string;
  editMode: boolean;
  groupingKey?: string;
  groupedBy?: Array<IFilterable>;
  allowableCharts?: Array<string>;
  displayName?: string;
}

export default IChartComponent;
