import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import '../styles/App.css';
import SearchTypeSelector from '../containers/SearchToggle'


const Search: React.FC = () => {
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
                    <SearchTypeSelector />
                </Grid>
            </div>
        </div>
    )
}

export default Search