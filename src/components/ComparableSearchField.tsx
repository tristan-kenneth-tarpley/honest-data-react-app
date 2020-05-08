import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Select from 'react-select';
import {Text} from '../styles/Typography'

import {ButtonPrimary} from '../styles/Buttons'


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

export const CompareSearch: React.FC = () => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}