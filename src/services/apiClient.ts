import { metric } from "../types";
import { DayRange } from "react-modern-calendar-datepicker";


interface IAPIOptions {

}
export default class APIClient {
    url: string
    options: IAPIOptions
    constructor(){
        let url;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            url = 'http://127.0.0.1:5000'
        } else {
            url = 'https://api.honestdata.world'
        }
        this.url = url

        this.options = {
            
        }
    }

    mergeOptions(options?: IAPIOptions){
        return {...this.options, ...options}
    }

    async get(endpoint: string, options?: IAPIOptions) {
        const res = await fetch(this.url + endpoint, this.mergeOptions(options))
        const json = await res.json()
        return json
    }

    async query(src: string, endpoint: string | undefined, singleOrMulti: string) {
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

        let url = `${this.url}/${searchType}/${src}`
        if (endpoint) url += `/${endpoint}`

        const res = await fetch(url)
        const json = await res.json()

        return json
    }
}


interface __filterData {
    data: Array<any>
    metrics: Array<metric>
    shrink: boolean,
    from: DayRange['from']
    to: DayRange['to']
}
interface safeDate {
    date: number
    month: number
    year: number
}

// const parseDate = (from: safeDate, to: safeDate) => {
//     if (from === undefined || to === null) return -1
//     const _from = new Date(
//         from.year, from.month, from.date
//     )
//     const _to = new Date(
//         to.year, to.month, to.date
//     )

//     // if((check.getTime() <= to.getTime() && check.getTime() >= from.getTime()))  
// }

// export const filterData = (opts: __filterData) => {
//     const {metrics, data, shrink, from, to} = opts
//     const filters = metrics.map(m => m.value)
//     let base: any;

//     const dateFiltered = parseDate(from, to)
//     data.filter(d=>d.date)

//     if (shrink) base = data.filter((x, index)=>index % 2 === 0)
//     else base = data

//     const returned = base.map((d: any)=>{ 
//         let filtered: any = {};
//         for (let key of Object.keys(d)) {
//             if (filters.includes(key)) {
//                 if (key === "date") filtered[key] = new Date(d[key])
//                                                 .toLocaleDateString()
//                 else filtered[key] = d[key]
//             }
//         }
//         return filtered
//     })



//     return returned
// }