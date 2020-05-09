import React, {useEffect} from 'react'
import {useParams} from 'react-router'
import Skeleton from 'react-loading-skeleton';
import { connect } from 'react-redux'
import {hydrateDashboard, fetchData} from '../actions/dashboardActions'
import { Link } from 'react-router-dom';

interface RouteParams {
    src: string
    singleOrMulti: string
}

const Dashboard: React.FC = (props: any) => {
    const params = useParams<RouteParams>();
    const {singleOrMulti, src} = params

    useEffect(()=>{
        fetchData(singleOrMulti, src).then((data)=>{
            props.hydrateDashboard(data)
        })
    }, []);

    return (
        <div className="dashboard__container">
            { props.data ? (
                <React.Fragment>
                    <h5>{props.data.description}</h5>
                    <p>
                        <a target="__blank" href={props.data.source}>
                            {props.data.source}
                        </a>
                    </p>
                </React.Fragment>
            ) : (
                <Skeleton />
            ) }
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        data: state.dashboardReducer
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        hydrateDashboard: (data: any) => {
            dispatch(hydrateDashboard(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
