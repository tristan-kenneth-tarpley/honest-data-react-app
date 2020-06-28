import React, { useState, useEffect } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import '../styles/App.css';
import { searchTypes } from '../types';
import { CompareSearch } from './ComparableSearchField';
import { SingleSourceSearchField } from './SingleSourceSearchField';
import APIClient from '../services/apiClient';

const classNames = require('classnames');

const Search: React.FC = () => {
    const [activeSearchField, setActiveSearchField] = useState(searchTypes.singleSource)
    const [availableEndpoints, setAvailableEndpoints] = useState<Array<any>>([])

    useEffect(()=>{
        (async ()=>{
            const api = new APIClient();
            const res = await api.get('/available_endpoints');
            setAvailableEndpoints(res);
        })()
    }, [])
    console.log(availableEndpoints)
    return (
        <div className="search__container">
            <div className="search_screen">
                <Grid fluid>
                    <Row>
                        <Col style={{textAlign:'center'}} lg={12}>
                            <h2>Answer questions about social issues without bias.</h2>
                            <h4>For free.</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <ul className="searchToggle__controller">
                                <li
                                    onClick={() => setActiveSearchField(searchTypes.singleSource)}
                                    className={classNames({
                                        'active__search': activeSearchField === searchTypes.singleSource
                                    })}>
                                    Browse available data
                                </li>
                                <li
                                    onClick={() => setActiveSearchField(searchTypes.compareSources)}
                                    className={classNames({
                                        'active__search': activeSearchField === searchTypes.compareSources
                                    })}>
                                    Compare two data sources
                                </li>
                            </ul>
                        </Col>

                        {activeSearchField === searchTypes.compareSources 
                            && <CompareSearch />
                        }
                        {activeSearchField === searchTypes.singleSource
                            && <SingleSourceSearchField sources={availableEndpoints} />
                        }

                    </Row>
                </Grid>
            </div>
        </div>
    )
}

export default Search