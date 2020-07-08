import { chartListing, viewTypes } from "../types";
import { v4 as uuidv4 } from "uuid";
import { DayRange } from "react-modern-calendar-datepicker";

interface initialstate {
    from: DayRange["from"];
    to: DayRange["to"];
    data: any | null;
    editMode: boolean;
    dataViewType: viewTypes;
    charts: {
        [key: string]: chartListing;
    };
}

const initUID: string = uuidv4();
const secondUID: string = uuidv4();
const initialState: initialstate = {
    from: null,
    to: null,
    data: null,
    editMode: true,
    dataViewType: viewTypes.timeSeries,
    charts: {
        [initUID]: {
            orderOnPage: 1,
            width: 12,
            uid: initUID,
            editing: false,
            metrics: [
                {
                    label: "negative",
                    value: "negative",
                },
                {
                    label: "positive",
                    value: "positive",
                },
            ],
            chartType: "line",
        },
        [secondUID]: {
            orderOnPage: 2,
            width: 6,
            uid: secondUID,
            editing: false,
            metrics: [
                {
                    label: "negative",
                    value: "negative",
                },
                {
                    label: "pending",
                    value: "pending",
                },
            ],
            chartType: "bar",
        },
    },
};
interface _action {
    type: string;
    payload: any;
}

export const dashboardReducer = (state = initialState, action: _action) => {
    switch (action.type) {
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
            const { chartId, filters } = action.payload;
            state = {
                ...state,
                charts: {
                    ...state.charts,
                    [chartId]: {
                        ...state.charts[chartId],
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
            state = {
                ...state,
                charts: {
                    ...state.charts,
                    [uuidv4()]: action.payload,
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
            state = {
                ...state,
                charts: {
                    ...state.charts,
                    [action.payload.chartId]: {
                        ...state.charts[action.payload.chartId],
                        orderOnPage: action.payload.desiredOrder,
                    },
                },
            };
            break;
        default:
            return state;
    }

    return state;
};
