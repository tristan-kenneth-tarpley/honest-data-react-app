import { IReducer } from "../reducers";
import reorderCharts from "../../utils/reorderCharts";

export const chartReducer: IReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case "HYDRATE_DASHBOARD":
      state = {
        ...state,
        data: action.payload,
      };
      break;
    case "TOGGLE_EDIT_MODE":
      state = {
        ...state,
        editMode: action.payload,
      };
      break;
    case "EDIT_CHART":
      const { filters } = payload;
      state = {
        ...state,
        charts: {
          ...state.charts,
          [payload.chartId]: {
            ...state.charts[payload.chartId],
            metrics: filters,
          },
        },
      };
      break;
    case "EDIT_CHART_TYPE":
      state = {
        ...state,
        charts: {
          ...state.charts,
          [action.payload.chartId]: {
            ...state.charts[action.payload.chartId],
            chartType: action.payload.chartType,
          },
        },
      };
      break;
    case "ADD_CHART":
      const uid = Object.keys(payload)[0];
      state = {
        ...state,
        charts: {
          ...state.charts,
          [uid]: {
            ...payload[uid],
            orderOnPage: Object.keys(state.charts).length,
          },
        },
      };
      break;
    case "DELETE_CHART":
      const allowed = Object.keys(state.charts).filter(
        (key) => key !== action.payload
      );

      const filtered = Object.keys(state.charts)
        .filter((key) => allowed.includes(key))
        .reduce((obj: any, key: any) => {
          obj[key] = state.charts[key];
          return obj;
        }, {});

      state = {
        ...state,
        charts: filtered,
      };
      return state;
    case "EDIT_CHART_WIDTH":
      state = {
        ...state,
        charts: {
          ...state.charts,
          [action.payload.chartId]: {
            ...state.charts[action.payload.chartId],
            width: action.payload.width,
          },
        },
      };
      break;
    case "GROUP_CHART_BY":
      state = {
        ...state,
        charts: {
          ...state.charts,
          [payload.chartId]: {
            ...state.charts[payload.chartId],
            groupedBy: [...payload.groupedBy],
          },
        },
      };
      break;
    case "SET_DATE_RANGE":
      state = {
        ...state,
        from: action.payload.from,
        to: action.payload.to,
      };
      break;
    case "SET_CHART_DATE_RANGE":
      const { date_ } = action.payload;
      state = {
        ...state,
        charts: {
          ...state.charts,
          [action.payload.chartId]: {
            ...state.charts[action.payload.chartId],
            from: date_.from,
            to: date_.to,
          },
        },
      };
      break;
    case "SET_DATA_VIEW_TYPE":
      state = {
        ...state,
        dataViewType: action.payload,
      };
      break;
    case "SET_CHART_ORDER_ON_PAGE":
      const { previousOrder, desiredOrder } = payload;

      const charts = reorderCharts(
        payload.chartId,
        state.charts,
        desiredOrder,
        previousOrder
      );
      state = {
        ...state,
        charts,
      };

      break;
    case "SET_CHART_NAME":
      state = {
        ...state,
        charts: {
          ...state.charts,
          [action.payload.chartId]: {
            ...state.charts[action.payload.chartId],
            displayName: action.payload.value,
          },
        },
      };
      break;
    default:
      return state;
  }

  return state;
};
