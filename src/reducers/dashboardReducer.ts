import { chartListing } from '../types'
import { v4 as uuidv4 } from 'uuid';

interface initialstate {
    data: any | null,
    editMode: boolean,
    charts: {
        [key: string]: chartListing
    }
}

const initUID: string = uuidv4()
const initialState: initialstate =  {
    data: null,
    editMode: true,
    charts: {
        [initUID]: {
            uid: initUID,
            editing: false,
            metrics: [{
                label: "negative",
                value: "negative"
            }, {
                label: "positive",
                value: "positive"
            }], 
            chartType: "line",
            data: [
                { name: 'Page K', pending: 1000, positive: 2400},
                { name: 'Page L', pending: 300, positive: 4567},
                { name: 'Page M', pending: 280, positive: 1398},
                { name: 'Page N', pending: 200, positive: 9800},
                { name: 'Page O', pending: 278, positive: 4300},
                { name: 'Page P', pending: 20000, positive: 4800},
                { name: 'Page Q', pending: 189, positive: 7350},
                { name: 'Page R', pending: 7500, positive: 4800},
                { name: 'Page S', pending: 189, positive: 200},
                { name: 'Page T', pending: 135, positive: 4800},
            ]
        }
    }
}
interface _action {
    type: string
    payload: any
}

export const dashboardReducer = (state = initialState, action: _action) => {
    switch (action.type) {
        case "HYDRATE_DASHBOARD":
            state = {
                ...state,
                data: action.payload
            }
            break
        case "TOGGLE_EDIT_MODE":
            state = {
                ...state,
                editMode: action.payload
            }
            break
        case "EDIT_CHART":
            state = {
                ...state,
                charts: {
                    ...state.charts,
                    [action.payload.chartId]: {
                        ...state.charts[action.payload.chartId],
                        metrics: action.payload.filters
                    }
                }
            }
            break
        case "ADD_CHART":
            action.payload.data = [
                { name: 'Page K', pending: 1000, positive: 2400},
                { name: 'Page L', pending: 300, positive: 4567},
                { name: 'Page M', pending: 280, positive: 1398},
                { name: 'Page N', pending: 200, positive: 9800},
                { name: 'Page O', pending: 278, positive: 4300},
                { name: 'Page P', pending: 20000, positive: 4800},
                { name: 'Page Q', pending: 189, positive: 7350},
                { name: 'Page R', pending: 7500, positive: 4800},
                { name: 'Page S', pending: 189, positive: 200},
                { name: 'Page T', pending: 135, positive: 4800},
            ]
            state = {
                ...state,
                charts: {
                    ...state.charts,
                    [uuidv4()]: action.payload.data//action.payload
                }
            }
            break
        case "DELETE_CHART":
            const allowed = Object.keys(state.charts)
                .filter(key=>key !== action.payload)

            const filtered = Object.keys(state.charts)
                .filter(key => allowed.includes(key))
                .reduce((obj: any, key: any) => {
                    obj[key] = state.charts[key];
                    return obj;
                }, {});

            state = {
                ...state,
                charts: filtered
            }
            return state
            // const clone = (({ action.payload, ...state.charts }) => o)(obj)
            // state = {
            //     ...state,
            //     charts: {
            //         clone
            //     }
            // }
        default:
            return state
    }

    return state;
};