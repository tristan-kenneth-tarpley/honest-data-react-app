import React, {useEffect} from 'react'
import {useParams} from 'react-router'
import Skeleton from 'react-loading-skeleton';
import { connect } from 'react-redux'
import {hydrateDashboard, fetchData} from '../actions/dashboardActions'
import Dashboard from '../components/Dashboard'

interface RouteParams {
    src: string
    singleOrMulti: string
}

const DashboardContainer: React.FC = (props: any) => {
    const params = useParams<RouteParams>();
    const {singleOrMulti, src} = params

    useEffect(()=>{
        fetchData(singleOrMulti, src)
            .then( data => props.hydrateDashboard(data) )
    }, []);

    return (
        <div id="dashboard__container" className="dashboard__container">
            { props.data ? (
                <Dashboard data={props.data} />
            ) : (
                <Skeleton count={5} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
