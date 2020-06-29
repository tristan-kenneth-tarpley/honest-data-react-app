import React from 'react'
import {Col} from 'react-flexbox-grid'
import Card from './Card'
import {metric} from '../types'
import {LINE_CHART, PIE_CHART, BAR_CHART} from './charts/Charts'
import { DayRange } from 'react-modern-calendar-datepicker'


interface chartComponent {
    metrics: Array<metric>
    data: any
    uid: string
    to: DayRange['to']
    from: DayRange['from']
    chartType: string
    colWidth: number
    viewType: number
}
export const ChartListing: React.FC<chartComponent> = props => {
    const dataKey = props.metrics.filter(m=>m.value !== "date")[0].value
    
    const chartTable: any = {
        line: <LINE_CHART uid={props.uid} data={props.data} />,
        bar: <BAR_CHART uid={props.uid} data={props.data} />,
        pie: <PIE_CHART uid={props.uid} data={props.data} dataKey={dataKey} />
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
                })}  { (props.from && props.to) && (
                    <span className="helper sub chart-info">
                        ({`${props.from.month}-${props.from.day}-${props.from.year} `}
                        to {`${props.to.month}-${props.to.day}-${props.to.year}`})
                    </span>
                )}
                </h5>

                {chartTable[props.chartType]}
            </Card>
        </Col>
    )
}