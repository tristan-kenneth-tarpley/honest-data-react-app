import { DayRange, Day } from "react-modern-calendar-datepicker"
import { metric, viewTypes } from "../types"

interface __filterData {
    records: Array<any>
    metrics: Array<metric>
    shrink: boolean,
    from: DayRange['from']
    to: DayRange['to']
    viewType: viewTypes
}

export class DataViewModel {
    protected readonly records: __filterData['records']
    protected readonly metrics: __filterData['metrics']
    protected readonly shrink: __filterData['shrink']
    protected readonly from: __filterData['from']
    protected readonly to: __filterData['to']
    protected readonly reverse: boolean
    protected readonly viewType: viewTypes

    constructor({records, metrics, shrink, from, to, viewType}: __filterData){
        this.records = records
        this.metrics = metrics
        this.shrink = shrink
        this.from = from
        this.to = to
        this.reverse = true
        this.viewType = viewType
    }

    groupCategory(_metrics: __filterData['metrics']){
        const metrics: Array<metric> = (
            this.viewType === viewTypes.timeSeries
                ? [..._metrics, {value: "date", label: "date"}]
                : _metrics.filter((m: any)=>m.value !== "date")
        )

        return metrics
    }

    parseDate(date_: Day) {
        return new Date(date_!.year, date_!.month-1, date_!.day)
    }

    parseDateString(date_: string) {
        return new Date(date_)
    }

    evalDate(_from: Date, _to: Date, targetDate: Date) {
        if(
            targetDate.getTime() <= _to.getTime()
            && targetDate.getTime() >= _from.getTime()
        ) return true
        return false
    }
  
    clean() {
        const {metrics, records, shrink, from, to} = this
        const _metrics = this.groupCategory(metrics)
        const filters = _metrics.map(m => m.value)
        const shouldFilterDate = (from && to) ? true : false
        
        let base: any;
        if (shrink) base = records.filter((x, index)=>index % 2 === 0)
        else base = records


        if (shouldFilterDate) {
            let _from = this.parseDate(from!)
            let _to = this.parseDate(to!)
            base = base.filter((d: any)=>{
                const _check = this.parseDateString(d.date)
                return this.evalDate(_from, _to, _check) === true
            })
        }

        const returned = base.map((d: any)=>{ 
            let filtered: any = {};
            for (let key of Object.keys(d)) {
                if (filters.includes(key)) {
                    if (key === "date") filtered[key] = new Date(d[key]).toLocaleDateString()
                    else filtered[key] = d[key]
                }
            }
            return filtered
        })

        if (this.reverse) return returned.reverse()
        return returned
    }
}