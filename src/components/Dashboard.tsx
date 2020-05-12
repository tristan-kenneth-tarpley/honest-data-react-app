import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Card from '../components/Card'
import { Link } from 'react-router-dom';
import Toolbar from '../components/Toolbar'
import {decamelize} from '../helpers'
import {LINE_CHART, PIE_CHART, BAR_CHART, STACKED_BAR_CHART} from '../components/Charts'

const chartData = [
    { name: 'Page A', uv: 1000, pv: 2400},
    { name: 'Page B', uv: 300, pv: 4567},
    { name: 'Page C', uv: 280, pv: 1398},
    { name: 'Page D', uv: 200, pv: 9800},
    { name: 'Page E', uv: 278, pv: 4300},
    { name: 'Page F', uv: 189, pv: 4800},
    { name: 'Page G', uv: 189, pv: 4800},
    { name: 'Page H', uv: 189, pv: 4800},
    { name: 'Page I', uv: 189, pv: 4800},
    { name: 'Page J', uv: 189, pv: 4800},
];
    

interface dashboard {
    data: any
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

    return (
        <React.Fragment>
            <Grid fluid>
                <Toolbar
                    source={data.source}
                    description={data.description}
                    filterables={filterables}
                    title={data.title} />
                <Row>
                    <Col className="parent" lg={6} md={6}>
                        <Card>   
                            <h5>Line chart</h5>
                            <LINE_CHART data={chartData} />
                        </Card>
                    </Col>
                    <Col className="parent" lg={6} md={6}>
                        <Card>       
                            <h5>Pie Chart</h5>
                            <PIE_CHART data={chartData} />
                        </Card>
                    </Col>
                    <Col className="parent" lg={6} md={6}>
                        <Card>       
                            <h5>Bar chart</h5>
                            <BAR_CHART data={chartData} />
                        </Card>
                    </Col>
                    <Col className="parent" lg={6} md={6}>
                        <Card> 
                            <h5>Stacked Bar chart</h5>     
                            <STACKED_BAR_CHART data={chartData} /> 
                        </Card>
                    </Col>
                </Row>
            </Grid>
        </React.Fragment>
    )
}

export default Dashboard