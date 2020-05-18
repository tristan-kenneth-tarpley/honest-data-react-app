import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Card from '../components/Card'
import { Link } from 'react-router-dom';
import Toolbar from '../components/Toolbar'
import {ButtonPrimary, ButtonSecondary} from '../styles/Buttons'
import {LINE_CHART, PIE_CHART, BAR_CHART, STACKED_BAR_CHART} from '../components/Charts'
import {chartListing, metric, endpointsKeys, APIResponse, filterable, viewTypes} from '../types'
import { ChartListing } from './ChartListing';
import { filterData } from '../apiUtils/apiClient';

interface dashboard {
    source: string
    src: string
    description: string
    title: string
    endpoints: Array<endpointsKeys>
    editMode: boolean
    toggleEditMode: () => void
    records: APIResponse["records"]
    charts: Array<chartListing>
    viewType: number
    viewTypes: any
}

const Dashboard: React.FC<dashboard> = (props) => {
    const {source, description, title, endpoints, src} = props
    const chartKeys = Object.keys(props.charts)
    
    return (
        <React.Fragment>
            <Grid fluid>
                <ButtonPrimary onClick={props.toggleEditMode} id="toggleEditMode">
                    { props.editMode
                        ? <i className="fad fa-expand-arrows"></i>
                        : <i className="fad fa-pen"></i>
                    }
                </ButtonPrimary>
                <Toolbar
                    source={source}
                    description={description}
                    title={title}
                    endpoints={endpoints}
                    src={src} />
                <Row>
                    {
                        chartKeys.length > 0 ? (
                            chartKeys.map((_chart: any)=>{
                                const chart = props.charts[_chart]                                
                                if (props.viewTypes[props.viewType] === "timeSeries"
                                    && chart.metrics.findIndex(x => x.value==="date") === -1) {
                                    chart.metrics.push({value:"date", label: "date"})
                                } else if (props.viewTypes[props.viewType] !== "timeSeries") {
                                    chart.metrics = chart.metrics.filter(m=>m.value !== "date")
                                }
                                const data = filterData(
                                    props.records, chart.metrics,
                                    props.records.length > 15 ? true : false
                                ).reverse()
                                
                                return (
                                <ChartListing
                                    metrics={chart.metrics}
                                    colWidth={chart.width}
                                    data={data}
                                    chartType={chart.chartType}
                                    uid={_chart} />
                                )
                            })
                        ) : (
                            <Col style={{marginTop: '1em',textAlign:'center'}} lg={12}>
                                <h5>Dashboard is empty. Start by adding some charts on the left!</h5>
                            </Col>
                        )
                    }
                </Row>
            </Grid>
        </React.Fragment>
    )
}

export default Dashboard