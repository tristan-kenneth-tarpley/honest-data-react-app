import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Card from '../components/Card'
import { Link } from 'react-router-dom';
import Toolbar from '../components/Toolbar'
import {decamelize} from '../helpers'

interface dashboard {
    data: any
}

const Dashboard: React.FC<dashboard> = (props) => {
    const {data} = props

    let filterables: any = [{value: "all", label: "show all"}]
    for (let i of Object.keys(data.records[0])) {
        const root = data.records[0]
        const disallowedKeys = ["internal", "flag"]
        console.log(i, disallowedKeys.includes(root[i]))
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
                    <Col className="parent" lg={4} md={4}>
                        <Card>       
                        </Card>
                    </Col>
                    <Col className="parent" lg={4} md={4}>
                        <Card>       
                        </Card>
                    </Col>
                    <Col className="parent" lg={4} md={4}>
                        <Card>       
                        </Card>
                    </Col>
                    <Col className="parent" lg={4} md={4}>
                        <Card>       
                        </Card>
                    </Col>
                    <Col className="parent" lg={8} md={8}>
                        <Card>       
                        </Card>
                    </Col>
                </Row>
            </Grid>
        </React.Fragment>
    )
}

export default Dashboard