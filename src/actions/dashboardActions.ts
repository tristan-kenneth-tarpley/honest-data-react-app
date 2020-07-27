import { metric, viewTypes, ISafeChartListing } from "../types";
import { DayRange } from "react-modern-calendar-datepicker";

export const hydrateDashboard = (data: string) => {
  return {
    type: "HYDRATE_DASHBOARD",
    payload: data,
  };
};

export interface addChartInterface {
  uid: string;
  metrics: Array<metric>;
  chartType: string;
}
export const addChart = (data: ISafeChartListing) => {
  return {
    type: "ADD_CHART",
    payload: data,
  };
};

export const toggleEditMode = (data: boolean) => {
  return {
    type: "TOGGLE_EDIT_MODE",
    payload: data,
  };
};

export interface editchart {
  chartId: string;
  filters: Array<metric>;
}
export const editChart = (chart: editchart) => {
  return {
    type: "EDIT_CHART",
    payload: chart,
  };
};

export const editChartType = (chart: {
  chartId: string;
  chartType: string;
}) => {
  return {
    type: "EDIT_CHART_TYPE",
    payload: chart,
  };
};

export const deleteChart = (uid: string) => {
  return {
    type: "DELETE_CHART",
    payload: uid,
  };
};

export const editChartWidth = (width: number, chartId: string) => {
  return {
    type: "EDIT_CHART_WIDTH",
    payload: { width, chartId },
  };
};

export const setDateRange = (date_: DayRange) => {
  return {
    type: "SET_DATE_RANGE",
    payload: {
      from: date_.from,
      to: date_.to,
    },
  };
};

export const setChartDateRange = (date_: DayRange, chartId: string) => {
  return {
    type: "SET_CHART_DATE_RANGE",
    payload: {
      chartId,
      date_,
    },
  };
};

export const setDataViewType = (viewType: viewTypes) => {
  return {
    type: "SET_DATA_VIEW_TYPE",
    payload: viewType,
  };
};

export const setChartOrderOnPage = ({
  previousOrder,
  desiredOrder,
  chartId,
}: {
  previousOrder: number;
  desiredOrder: number;
  chartId: string;
}) => {
  return {
    type: "SET_CHART_ORDER_ON_PAGE",
    payload: { previousOrder, desiredOrder, chartId },
  };
};
