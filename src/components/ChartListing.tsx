import React, { JSXElementConstructor } from 'react'
import {Col} from 'react-flexbox-grid'
import Card from './Card'
import {chartListing, metric} from '../types'
import {LINE_CHART, PIE_CHART, BAR_CHART} from './Charts'


interface chartComponent {
    metrics: Array<metric>
    data: any
    uid: string
    chartType: string
    colWidth: number
}
export const ChartListing: React.FC<chartComponent> = props => {
    const chartTable: any = {
        line: <LINE_CHART uid={props.uid} data={props.data} />,
        bar: <BAR_CHART uid={props.uid} data={props.data} />,
        pie: <PIE_CHART uid={props.uid} data={props.data} />
    }

    return (
        <Col className="parent" lg={props.colWidth} md={props.colWidth} sm={12}>
            <Card>   
                <h5>{props.metrics.map((metric_: metric, index:number)=> {
                    return (
                        `${metric_.label}${index < props.metrics.length - 1
                            ? ", "
                            : ''}`
                    )
                })}</h5>
                {chartTable[props.chartType]}
                {/* <LINE_CHART uid={props.uid} data={props.data} /> */}
            </Card>
        </Col>
    )
}