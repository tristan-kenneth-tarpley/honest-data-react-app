import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router'
import Skeleton from 'react-loading-skeleton';
import { connect } from 'react-redux'
import {hydrateDashboard, fetchData, toggleEditMode,
        addChart
} from '../actions/dashboardActions'
import {getFilterables} from '../apiUtils/filterables'
import Dashboard from '../components/Dashboard'
import SidebarContainer from '../containers/SidebarContainer'
import { APIResponse, chartListing, filterable, dataTypes } from '../types';
import { filterData } from '../apiUtils/apiClient';
import { DayRange } from 'react-modern-calendar-datepicker';
interface RouteParams {
    src: string
    singleOrMulti: string
    endpoint?: string | undefined
}

interface DashboardContainer {
    data: APIResponse
    from: DayRange
    to: DayRange
    editMode: ()=>void
    chartListings: {
        [key: string]: chartListing
    }
    hydrateDashboard: (data: APIResponse) => APIResponse
    toggleEditMode: (data: boolean) => void
    addChart: (data: APIResponse['records']) => void
}

const DashboardContainer: React.FC = (props: any) => {
    const params = useParams<RouteParams>();
    const {singleOrMulti, src, endpoint} = params
    const {editMode} = props
    const filterablesDefinition: Array<filterable> = []
    const [filterables, updateFilterables] = useState(filterablesDefinition);

    useEffect(()=>{
        fetchData(singleOrMulti, src, endpoint)
            .then( data => {
                updateFilterables(
                    getFilterables(Object.keys(data.records[0]))
                )
                props.hydrateDashboard(data)
            })
        
    }, [endpoint]);

    let source, description, title, endpoints, records, viewType, viewTypes;
    if (props.data){
        source = props.data.source
        description = props.data.description
        title = props.data.title
        endpoints = props.data.endpoints
        records = props.data.records
        viewType = props.data.viewType
        viewTypes = props.data.viewTypes
    }
    return (
        <div className="dashboard">
            { props.data ? (
                <React.Fragment>
                    {props.editMode ? (
                        <SidebarContainer
                            filterables={filterables}
                            viewType={viewType}
                        />
                     ) : ''}

                    <div id="dashboard__container" className="dashboard__container">
                        <Dashboard
                            records={records}
                            charts={props.chartListings}
                            editMode={editMode}
                            toggleEditMode={()=>props.toggleEditMode(!props.editMode)}
                            source={source}
                            src={src}
                            to={props.to}
                            from={props.from}
                            description={description}
                            title={title}
                            endpoints={endpoints}
                            viewType={viewType}
                            viewTypes={viewTypes}
                            />
                    </div>
                </React.Fragment>
            ) : (
                <Skeleton count={5} />
            )}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        data: state.dashboardReducer.data,
        editMode: state.dashboardReducer.editMode,
        chartListings: state.dashboardReducer.charts,
        to: state.dashboardReducer.to,
        from: state.dashboardReducer.from
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        hydrateDashboard: (data: string) => dispatch(hydrateDashboard(data)),
        toggleEditMode: (data: boolean) => dispatch(toggleEditMode(data)),
        addChart: (data: any) => dispatch(addChart(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
