import {chartItem} from '../types'
import { v4 as uuidv4 } from 'uuid';

interface initialstate {
    data: any | null,
    editMode: boolean,
    charts: Array<chartItem>
}
const initialState: initialstate =  {
    data: null,
    editMode: true,
    charts: [{
        uid: uuidv4(),
        metrics: ["uv", "pv"], 
        chartType: "line",
        data: [
            { name: 'Page K', uv: 1000, pv: 2400},
            { name: 'Page L', uv: 300, pv: 4567},
            { name: 'Page M', uv: 280, pv: 1398},
            { name: 'Page N', uv: 200, pv: 9800},
            { name: 'Page O', uv: 278, pv: 4300},
            { name: 'Page P', uv: 20000, pv: 4800},
            { name: 'Page Q', uv: 189, pv: 7350},
            { name: 'Page R', uv: 7500, pv: 4800},
            { name: 'Page S', uv: 189, pv: 200},
            { name: 'Page T', uv: 189, pv: 4800},
        ]
            
    }]
}

export const dashboardReducer = (state = initialState, action: any) => {
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
        case "ADD_CHART":
            state = {
                ...state,
                charts: [...state.charts, action.payload]
            }
            break
        default:
            return state
    }

    return state;
};