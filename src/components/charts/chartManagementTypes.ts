import {
  IFilterable,
  ViewTypes,
  IMetric,
  IChartListing,
  ISafeChartListing,
} from "../../types";
import { DayRange } from "react-modern-calendar-datepicker";
import { editchart } from "../../actions/dashboardActions";

type IBaseChartManagement = {};

interface IChartEditing extends IBaseChartManagement {
  from: DayRange["from"];
  to: DayRange["to"];
  dataViewType: ViewTypes;
  setChartDateRange: (_date: DayRange, chartId: string) => void;
  filterables: Array<IFilterable>;
  groupedByFields?: Array<IFilterable>;
  currentlyGroupedBy?: Array<IFilterable>;
}

export interface ISidebarItem extends IChartEditing {
  viewType: number;
  deleteChart: (uid: string) => void;
  editChartWidth: (width: number, chartId: string) => void;
  editChartType: (chart: { chartId: string; chartType: string }) => void;
  chartOrderOnPage: number;
  metrics: Array<IMetric>;
  editing?: boolean;
  setGroupedBy: ({
    chartId,
    groupedBy,
  }: {
    chartId: string;
    groupedBy: Array<IFilterable>;
  }) => void;
  uid: string;
  chartWidth: number;
  chartType: string;
  editChart: (chart: editchart) => void;
}

export interface IChartItemEditing extends IChartEditing {
  uid: string;
  chartWidth?: number;
  dataViewType: ViewTypes;
  error?: boolean;
  setActiveChartType: any; //(() => void) | Dispatch<SetStateAction<string>>;
  setNewChartWidth: (newChartWidth: number) => void;
  onSave: () => void;
  setGroupedBy: (ev: any) => void;
  addFilterableToList: (ev: any) => void;
  activeChartType?: string;
  adding?: boolean;
  toggleEditing?: () => void;
  filters?: Array<any>;
}

export interface ISidebarContainer extends IBaseChartManagement {
  uid: string;
  editChart: (chart: editchart) => void;
  filterables: Array<IFilterable>;
  chartListings: { [key: string]: IChartListing };
  chartType: string;
  viewType: number;
  from: DayRange["from"];
  to: DayRange["to"];
  dataViewType: ViewTypes;
  groupedByFields: Array<IFilterable>;
  addChart: (chart: ISafeChartListing) => void;
  deleteChart: (uid: string) => void;
  editChartWidth: (width: number, chartId: string) => void;
  editChartType: (chart: { chartId: string; chartType: string }) => void;
  setChartDateRange: (_date: DayRange, chartId: string) => void;
  setChartOrderOnPage: ({
    previousOrder,
    desiredOrder,
    chartId,
  }: {
    previousOrder: number;
    desiredOrder: number;
    chartId: string;
  }) => void;
}
