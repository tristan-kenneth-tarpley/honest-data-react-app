export enum searchTypes {
    compareSources, singleSource
}

export interface chartItem {
    uid: string
    metrics: Array<string>
    chartType: string
    data: Array<{
        [key: string]: string | number
    }>
}