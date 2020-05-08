import {searchTypes} from '../types'

const initialState =  {
    searchType: searchTypes.singleSource
}

interface action {
    type: string
    payload: number
}

export const searchTypeReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case "TOGGLE_TYPE":
            state = {
                ...state,
                searchType: action.payload
            };
            break;
        default:
            return state
    }

    return state;
};