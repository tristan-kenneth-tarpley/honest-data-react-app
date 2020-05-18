import { APIResponse, filterable, metric } from "../types";

export default class APIClient {
    baseUrl: string

    constructor(singleOrMulti: string){

        let url;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            url = 'http://127.0.0.1:5000'
        } else {
            url = 'https://api.honestdata.world'
        }


        let searchType;
        switch(singleOrMulti) {
            case 'single':
                searchType = 'src'
                break
            case 'multi':
                searchType = 'joint'
                break
            default:
                throw new Error()
        }

        this.baseUrl = `${url}/${searchType}`
    }

    async query(src: string, endpoint: string | undefined) {
        let url = `${this.baseUrl}/${src}`
        if (endpoint) url += `/${endpoint}`

        const res = await fetch(url)
        const json = await res.json()

        return json
    }
}

export const filterData = (data: Array<any>, metrics: Array<metric>, shrink=false) => {
    const filters = metrics.map(m => m.value)
    let base: any;
    if (shrink) base = data.filter((x, index)=>index % 2 === 0)
    else base = data

    const returned = base.map((d: any)=>{ 
        let filtered: any = {};
        for (let key of Object.keys(d)) {
            
            if (filters.includes(key)) {
                if (key === "date") filtered[key] = new Date(d[key])
                                                .toLocaleDateString()
                else filtered[key] = d[key]
            }
        }
        return filtered
    })



    return returned
}