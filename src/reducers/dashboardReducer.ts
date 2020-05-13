const initialState =  {
    data: null,
    editMode: true
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
        default:
            return state
    }

    return state;
};