import React from 'react'
import { Row, Col } from 'react-flexbox-grid';


const sources = [
    { value: 'COVID-19', uid: 'adsf' },
    { value: 'immigration data', uid: '3nqrl' },
    { value: 'Yo mama data', uid: 'adslfkj' },
    { value: 'Yo mama data', uid: 'avw' },
    { value: 'Yo mama data', uid: 'gqwr' },
    { value: 'Yo mama data', uid: 'hgw' },
    { value: 'Yo mama data', uid: 'ewrf' },
];

export const SingleSourceSearchField: React.FC = () => {
    return (
        <React.Fragment>
            <Col lg={12}>
                <ul className="availableSources__list">
                    <Row>
                    {sources.map(src=>{
                        return (
                            <Col lg={4} md={4} sm={6} xs={12}>

                                <li key={src.uid}>{src.value}</li>
                            </Col>
                        )
                    })}
                    </Row>
                </ul>
            </Col>
        </React.Fragment>
    )
}