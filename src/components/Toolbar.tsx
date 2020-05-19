import React from 'react'
import { connect } from 'react-redux'
import {Listing} from '../components/SingleSourceSearchField'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { DateRange } from './DateRange';
import { Helper } from '../styles/Typography';
import { date, dateRange } from '../types';
import {setDateRange} from '../actions/dashboardActions'
import { DayRange } from 'react-modern-calendar-datepicker';

interface endpoint {
    key: string,
    active: boolean
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
                        <Col key={index} lg={12} md={12} sm={12}>
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

interface toolbar {
    title: string
    filterables?: Array<any>
    source: string
    description: string
    endpoints: Array<endpoint>
    src: string
    from: date
    to: date
    setDateRange: (_date?: any) => void
}

const Toolbar: React.FC<toolbar> = (props) => {
    
    return (
        <div className="dashboard__toolbar">
            <Grid fluid>
                <Row>
                    <Col lg={4} md={4} sm={12}>
                        <ToolbarHeader
                            title={props.title}
                            description={props.description}
                            source={props.source}/>
                    </Col>
                    <Col lg={4} md={4} sm={12}>   
                        <br />
                        <Helper>Related data:</Helper>    
                        <Sources
                            endpoints={props.endpoints}
                            src={props.src}/>
                    </Col>
                    <Col lg={4} md={4} sm={12}> 
                        <br />
                        <Helper>Default date range:</Helper>   
                        <DateRange
                            from={props.from}
                            to={props.to}
                            setDateRange={props.setDateRange}
                            padding={true} />
                    </Col>
                    
                </Row>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        from: state.dashboardReducer.from,
        to: state.dashboardReducer.to
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setDateRange: (_date: DayRange) => dispatch(setDateRange(_date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)