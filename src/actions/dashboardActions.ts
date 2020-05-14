import apiClient from '../apiUtils/apiClient'
import { metric, APIResponse } from '../types'

const fetchData = async (singleOrMulti: string, src: string, endpoint?: string) => {
    const api = new apiClient(singleOrMulti)
    const data = await api.query(src, endpoint)
    return data
}

export interface initChart {
    uid: string
    metrics: Array<metric>
    chartType: string
}


const hydrateDashboard = (data: string) => {
    return ({
        type: "HYDRATE_DASHBOARD",
        payload: data
    })
}

const addChart = (data: initChart) => {
    return ({
        type: "ADD_CHART",
        payload: data
    })
}


const toggleEditMode = (data: boolean) => {
    return ({
        type: "TOGGLE_EDIT_MODE",
        payload: data
    })
}

export interface editchart {
    chartId: string
    filters: Array<metric>
}
const editChart = (chart: editchart) => {
    return ({
        type: "EDIT_CHART",
        payload: chart
    })
}

const deleteChart = (uid: string) => {
    return ({
        type: "DELETE_CHART",
        payload: uid
    })
}

export {
    hydrateDashboard, fetchData,
    toggleEditMode, addChart,
    editChart, deleteChart
}