import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Card from '../components/Card'
import { Link } from 'react-router-dom';
import Toolbar from '../components/Toolbar'
import {ButtonPrimary, ButtonSecondary} from '../styles/Buttons'
import {decamelize} from '../helpers'
import {LINE_CHART, PIE_CHART, BAR_CHART, STACKED_BAR_CHART} from '../components/Charts'

const chartData = [
    { name: 'Page A', uv: 1000, pv: 2400},
    { name: 'Page B', uv: 300, pv: 4567},
    { name: 'Page C', uv: 280, pv: 1398},
    { name: 'Page D', uv: 200, pv: 9800},
    { name: 'Page E', uv: 278, pv: 4300},
    { name: 'Page F', uv: 20000, pv: 4800},
    { name: 'Page G', uv: 189, pv: 7350},
    { name: 'Page H', uv: 7500, pv: 4800},
    { name: 'Page I', uv: 189, pv: 200},
    { name: 'Page J', uv: 189, pv: 4800},
];



interface dashboard {
    data: any
    editMode: boolean
    toggleEditMode: () => void
    charts: Array<any>
}

const Dashboard: React.FC<dashboard> = (props) => {
    const {data} = props

    let filterables: any = [{value: "all", label: "show all"}]
    for (let i of Object.keys(data.records[0])) {
        const root = data.records[0]
        const disallowedKeys = ["internal", "flag"]
        if (i !== "uid" && !disallowedKeys.includes(root[i])) {
            filterables = [...filterables, {
                value: i,
                label: decamelize(i)
            }]
        }
    }

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
                    filterables={filterables}
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
                                        <h5>{chart.metrics.map((metric: string, index:number)=> {
                                            return (
                                                `${metric}${index < chart.metrics.length - 1
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