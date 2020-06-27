import { DayRange } from "react-modern-calendar-datepicker"

export enum searchTypes {
    compareSources, singleSource
}

export interface filterable {
    value: string
    label: string
}
export interface metric {
    value: string | number
    label: string
}
export interface chartListing {
    uid: string
    width: number
    metrics: Array<metric>
    chartType: string
    from?: DayRange['from']
    to?: DayRange['to']
    editing?: boolean
}




// shared
export type datetimeField = Date
export type uid = string

export type recordFields = datetimeField | string | number | boolean | uid
export interface record {
    [key: string]: recordFields
}

export enum viewTypes {
    timeSeries, categorized
}

export interface APIResponse {
    endpoints?: Array<endpointsKeys>
    title: string
    viewType: viewTypes // see viewTypes enum
    source: string
    records: Array<record>
    description: string
    acceptableCharts?: Array<number>
}

export enum charts {
    bar, pie, treeMap,
    scatterPlot, waterfall, line,
    dualAxisLine, bullet, bubbleChart,
    area, stacked
}
export enum dataTypes {
    location, score, dateTime, metricLowIsGood, metricLowIsBad
}
export interface APIField {
    dataType: dataTypes
    value: string | number | null | undefined
}


export interface endpointsKeys {
    key: string,
    active: boolean
}


export type dateRange = DayRange
export interface date {
    day: number
    month: number
    year: number
}