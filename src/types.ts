import { DayRange } from "react-modern-calendar-datepicker";

export enum SearchTypes {
  compareSources,
  singleSource,
}

export interface IFilterable {
  value: string;
  label: string;
}
export interface IMetric {
  value: string | number;
  label: string;
}
export interface IChartListing {
  uid: string;
  width: number;
  metrics: Array<IMetric>;
  chartType: string;
  orderOnPage: number;
  from?: DayRange["from"];
  to?: DayRange["to"];
  editing?: boolean;
  groupedBy?: Array<IFilterable>;
}

export interface ISafeChartListing {
  [uid: string]: {
    uid: string;
    metrics: Array<IMetric>;
    width?: number;
    chartType?: string;
    orderOnPage?: number;
    from?: DayRange["from"];
    to?: DayRange["to"];
    editing?: boolean;
    groupedBy?: Array<IFilterable>;
  };
}

// shared
export type datetimeField = Date;
export type uid = string;

export type recordFields = datetimeField | string | number | boolean | uid;
export interface record {
  [key: string]: recordFields;
}

export enum ViewTypes {
  timeSeries,
  categorized,
}

export interface APIResponse {
  endpoints?: Array<IEndpointsKeys>;
  title: string;
  viewType: ViewTypes; // see viewTypes enum
  source: string;
  records: Array<record>;
  description: string;
  acceptableCharts?: Array<number>;
}

export enum Charts {
  bar,
  pie,
  treeMap,
  scatterPlot,
  waterfall,
  line,
  dualAxisLine,
  bullet,
  bubbleChart,
  area,
  stacked,
}
export enum DataTypes {
  location,
  score,
  dateTime,
  metricLowIsGood,
  metricLowIsBad,
}
export interface IAPIField {
  dataType: DataTypes;
  value: string | number | null | undefined;
}

export interface IEndpointsKeys {
  key: string;
  active: boolean;
}

export type dateRange = DayRange;
export interface IDate {
  day: number;
  month: number;
  year: number;
}
