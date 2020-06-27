import apiClient from '../apiUtils/apiClient'

export const fetchData = async (singleOrMulti: string, src: string, endpoint?: string) => {
    const api = new apiClient(singleOrMulti);
    const data = await api.query(src, endpoint);
    return data
}
