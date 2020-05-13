import React, {useEffect} from 'react'
import {useParams} from 'react-router'
import Skeleton from 'react-loading-skeleton';
import { connect } from 'react-redux'
import {hydrateDashboard, fetchData, toggleEditMode,
        addChart, editChart
} from '../actions/dashboardActions'
import Dashboard from '../components/Dashboard'
import DashboardSidebar from '../containers/SidebarContainer'
import {chartItem} from '../types'

interface RouteParams {
    src: string
    singleOrMulti: string
    endpoint?: string | undefined
}

const DashboardContainer: React.FC = (props: any) => {
    const params = useParams<RouteParams>();
    const {singleOrMulti, src, endpoint} = params
    const {editMode} = props

    useEffect(()=>{
        fetchData(singleOrMulti, src, endpoint)
            .then( data => props.hydrateDashboard(data) )
    }, [endpoint]);

    return (
        <div className="dashboard">
            { props.editMode && (
                <DashboardSidebar
                    charts={props.charts}
                    editChart={props.editChart}
                    /> 
            )}
            <div id="dashboard__container" className="dashboard__container">
                { props.data ? (
                    <Dashboard
                        charts={props.charts}
                        editMode={editMode}
                        toggleEditMode={()=>props.toggleEditMode(!props.editMode)}
                        data={props.data} />
                ) : (
                    <Skeleton count={5} />
                ) }
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        data: state.dashboardReducer.data,
        editMode: state.dashboardReducer.editMode,
        charts: state.dashboardReducer.charts
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        hydrateDashboard: (data: any) => dispatch(hydrateDashboard(data)),
        toggleEditMode: (data: boolean) => dispatch(toggleEditMode(data)),
        addChart: (data: any) => dispatch(addChart(data)),
        editChart: (chart: chartItem) => dispatch(editChart(chart))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
