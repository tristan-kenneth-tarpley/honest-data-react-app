import React from 'react'
import { Row, Col } from 'react-flexbox-grid';
import {Link} from 'react-router-dom'

const sources = [
    { value: 'COVID-19', uid: 'adsf', route: 'covid' }
];

export const SingleSourceSearchField: React.FC = () => {
    return (
        <React.Fragment>
            <Col lg={12}>
                <ul className="availableSources__list">
                    <Row>
                    {sources.map(src=>{
                        // need to build in view logic here for when there are fewer than 4 results
                            //  lg={4} md={4} sm={6} xs={12}
                        return (
                            <Col key={src.uid}>
                                <Link className="invisibleLink" to={`/dashboard/${src.route}/single`}>
                                    <li key={src.uid}>{src.value}</li>
                                </Link>
                            </Col>
                        )
                    })}
                    </Row>
                </ul>
            </Col>
        </React.Fragment>
    )
}