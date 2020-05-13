export enum searchTypes {
    compareSources, singleSource
}

export interface chartItem {
    editing: boolean
    metrics: Array<string>
    chartType: string
    data: Array<{
        [key: string]: string | number
    }>
}