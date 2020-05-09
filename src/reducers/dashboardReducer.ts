const initialState =  null

export const dashboardReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "HYDRATE_DASHBOARD":
            state = action.payload;
            break;
        default:
            return state
    }

    return state;
};