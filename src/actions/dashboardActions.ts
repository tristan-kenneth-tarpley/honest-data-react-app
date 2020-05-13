import apiClient from '../apiUtils/apiClient'

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

export {hydrateDashboard, fetchData}