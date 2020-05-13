import React from 'react'
import { Row, Col } from 'react-flexbox-grid';
import {Link} from 'react-router-dom'
import { Props } from 'react-linkify';

const sources = [
    { value: 'COVID-19', uid: 'adsf', route: 'covid' }
];

export const SingleSourceSearchField: React.FC = () => {
    return (
        <React.Fragment>
            <Col lg={12}>
                <ul className="availableSources__list">
                    <Row style={{width: '100%'}}>
                    {sources.map(src=>{
                        return (
                            <Col lg={3} md={3} sm={6} xs={12} key={src.uid}>
                                <Listing
                                    uid={src.uid}
                                    route={src.route}
                                    value={src.value}
                                />
                            </Col>
                        )
                    })}
                    </Row>
                </ul>
            </Col>
        </React.Fragment>
    )
}

interface listing {
    uid: string
    route: string
    value: string
}

export const Listing: React.FC<listing> = (props) => {
    return (
        <React.Fragment>
            <Link className="invisibleLink" to={`/dashboard/${props.route}/single`}>
                <li key={props.uid}>{props.value}</li>
            </Link>
        </React.Fragment>
    )
}