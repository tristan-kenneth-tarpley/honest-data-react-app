import apiClient from '../apiUtils/apiClient'
import { metric } from '../types'
import { stringify } from 'querystring'

const fetchData = async (singleOrMulti: string, src: string, endpoint?: string) => {
    const api = new apiClient(singleOrMulti)
    const data = await api.query(src, endpoint)
    return data
}



const hydrateDashboard = (data: string) => {
    return ({
        type: "HYDRATE_DASHBOARD",
        payload: data
    })
}

export interface addChartInterface {
    uid: string
    metrics: Array<metric>
    chartType: string
}
const addChart = (data: addChartInterface) => {
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

const editChartType = (chart: {
    chartId: string
    chartType: string
}) => {
    return ({
        type: "EDIT_CHART_TYPE",
        payload: chart
    })
}

const deleteChart = (uid: string) => {
    return ({
        type: "DELETE_CHART",
        payload: uid
    })
}

const editChartWidth = (width: number, chartId:string) => {
    return ({
        type: "EDIT_CHART_WIDTH",
        payload: { width, chartId }
    })
}

export {
    hydrateDashboard, fetchData,
    toggleEditMode, addChart,
    editChart, deleteChart, editChartWidth, editChartType
}