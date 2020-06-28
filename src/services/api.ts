import apiClient from './apiClient'

export const fetchData = async (singleOrMulti: string, src: string, endpoint?: string) => {
    const api = new apiClient();
    const data = await api.query(src, endpoint, singleOrMulti);
    return data
}
