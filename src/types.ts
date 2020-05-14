export enum searchTypes {
    compareSources, singleSource
}

export interface filterable {
    value: string
    label: string
}

export interface chartItem {
    editing: boolean
    metrics: Array<string>
    chartType: string
    data: Array<{
        [key: string]: string | number
    }>
}