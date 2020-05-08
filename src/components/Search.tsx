import React from 'react'
import {Text} from '../styles/Typography'
import { Grid, Row, Col } from 'react-flexbox-grid';
import {ButtonPrimary, ButtonSecondary, ButtonTertiary} from '../styles/Buttons'
import Select from 'react-select';
import '../styles/App.css';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];


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
                    <Row>
                        <Col lg={6}>
                            <Text size="sm" len="short">How does...</Text>
                            <Select
                                options={options}
                                />
                        </Col>
                        <Col lg={6}>
                            <Text size="sm" len="short">Affect...</Text>
                            <Select
                                options={options}
                                />
                        </Col>
                        <Col lg={12}>
                            <ButtonPrimary id="search__button">Let's find out</ButtonPrimary>
                        </Col>
                    </Row>
                </Grid>
            </div>
        </div>
    )
}

export default Search