import apiClient from '../apiUtils/apiClient'

const fetchData = async (singleOrMulti: string, src: string, endpoint?: string) => {
    const api = new apiClient(singleOrMulti)
    const data = await api.query(src, endpoint)
    return data
}

const addChart = (data: any) => {
    return ({
        type: "ADD_CHART",
        payload: data
    })
}

const hydrateDashboard = (data: string) => {
    return ({
        type: "HYDRATE_DASHBOARD",
        payload: data
    })
}

const toggleEditMode = (data: boolean) => {
    return ({
        type: "TOGGLE_EDIT_MODE",
        payload: data
    })
}

const editChart = (chart: any) => {
    return ({
        type: "EDIT_CHART",
        payload: chart
    })
}

export {
    hydrateDashboard, fetchData,
    toggleEditMode, addChart,
    editChart
}