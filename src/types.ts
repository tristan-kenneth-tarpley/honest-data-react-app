export enum searchTypes {
    compareSources, singleSource
}

export interface filterable {
    value: string
    label: string
}
export interface metric {
    value: string
    label: string
}
export interface chartListing {
    editing: boolean
    metrics: Array<metric>
    chartType: string
    data: Array<{
        [key: string]: string | number
    }>
}