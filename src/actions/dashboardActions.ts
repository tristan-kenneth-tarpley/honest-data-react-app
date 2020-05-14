import apiClient from '../apiUtils/apiClient'
import { metric, chartListing } from '../types'

const fetchData = async (singleOrMulti: string, src: string, endpoint?: string) => {
    const api = new apiClient(singleOrMulti)
    const data = await api.query(src, endpoint)
    return data
}

export interface initChart {
    metrics: Array<metric>
    chartType: string
}
const addChart = (data: initChart) => {
    console.log(data)
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

export {
    hydrateDashboard, fetchData,
    toggleEditMode, addChart,
    editChart
}