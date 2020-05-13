import React from 'react'
import Select from 'react-select'
import {Listing} from '../components/SingleSourceSearchField'
import { Grid, Row, Col } from 'react-flexbox-grid';

interface endpoint {
    key: string,
    active: boolean
}
interface toolbar {
    title: string
    filterables: Array<any>
    source: string
    description: string
    endpoints: Array<endpoint>
    src: string
}

const ToolbarHeader: React.FC<{title:string, description:string, source:string}> = props => {
    return (
        <div className="info">
            <h5>{props.title}</h5>
            <p>{props.description}</p>
            <a target="__blank" href={props.source}>
                source
            </a>
        </div>
    )
}

const Sources: React.FC<any> = props => {
    const {endpoints, src} = props
    return (
        <Row className="available__sources">
            {
                endpoints.map((endpoint: endpoint, index: number)=>{
                    return (
                        <Col className="parent" key={index} lg={6} md={6} sm={6}>
                            <Listing 
                                key={index}
                                uid={index}
                                route={endpoint.key}
                                value={endpoint.key}
                                src={src}
                                active={endpoint.active} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

const Toolbar: React.FC<toolbar> = (props) => {
    
    return (
        <div className="dashboard__toolbar">
            <Grid fluid>
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <ToolbarHeader
                            title={props.title}
                            description={props.description}
                            source={props.source}/>
                    </Col>
                    <Col lg={6} md={6} sm={12}>    
                        <Sources
                            endpoints={props.endpoints}
                            src={props.src}/>
                    </Col>
                </Row>
            </Grid>
            <Select
                id="select"
                defaultValue={props.filterables[0]}
                isMulti
                name="colors"
                options={props.filterables}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </div>
    )
}

export default Toolbar