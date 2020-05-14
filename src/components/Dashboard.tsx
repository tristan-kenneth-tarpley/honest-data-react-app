import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Card from '../components/Card'
import { Link } from 'react-router-dom';
import Toolbar from '../components/Toolbar'
import {ButtonPrimary, ButtonSecondary} from '../styles/Buttons'
import {LINE_CHART, PIE_CHART, BAR_CHART, STACKED_BAR_CHART} from '../components/Charts'
import {chartListing, metric} from '../types'

interface dashboard {
    data: any
    editMode: boolean
    toggleEditMode: () => void
    charts: Array<chartListing>
}

const Dashboard: React.FC<dashboard> = (props) => {
    const {data} = props
    const chartKeys = Object.keys(props.charts)

    return (
        <React.Fragment>
            <Grid fluid>
                <ButtonSecondary onClick={props.toggleEditMode} id="toggleEditMode">
                    { props.editMode ? 'Save' : 'Edit'}
                </ButtonSecondary>
                <Toolbar
                    source={data.source}
                    description={data.description}
                    title={data.title}
                    endpoints={data.endpoints}
                    src={data.src} />
                <Row>
                    {
                        chartKeys.length > 0 ? (
                            chartKeys.map((_chart: any)=>{
                                const chart = props.charts[_chart]
                                return (
                                <Col className="parent" lg={6} md={6}>
                                    <Card>   
                                        <h5>{chart.metrics.map((metric_: metric, index:number)=> {
                                            return (
                                                `${metric_.label}${index < chart.metrics.length - 1
                                                    ? ", "
                                                    : ''}`
                                            )
                                        })}</h5>
                                        <LINE_CHART uid={_chart} data={chart.data} />
                                    </Card>
                                </Col>
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