import React, {useState} from 'react'
import {ButtonPrimary, ButtonTertiary} from '../styles/Buttons'
import {SidebarItem} from '../components/SidebarItem'
import { connect } from 'react-redux'
import Select from 'react-select'
import {editChart, addChart, initChart, deleteChart
} from '../actions/dashboardActions'
import {chartListing, metric, APIResponse, filterable} from '../types'
import { filterData } from '../apiUtils/apiClient'
import { v4 as uuidv4 } from 'uuid';

interface sidebarContainer {
    filterables: Array<filterable>
    chartListings: {[key: string]: chartListing}
    editChart: any
    addChart: (chart: chartListing) => void
    deleteChart: (uid: string) => void
}

const SidebarContainer: React.FC<sidebarContainer> = (props) => {

    const {chartListings} = props

    const [adding, toggleAdding] = useState(false)
    const [error, toggleError] = useState(false)

    let filters: Array<metric> = []
    const add = (ev: any) => {
        filters = ev.map((filter:metric)=>({
            label: filter.label,
            value: filter.value
        })
    )}
    const onSave = () => {
        if (filters.length > 0) {
            // props.addChart({
            //     uid: uuidv4(),
            //     metrics: filters,
            //     chartType: "line",
            //     // FIXME
            //     data: [] 
            //     // data: props.data
            // })
            toggleError(false)
            toggleAdding(false)
        } else {
            toggleError(true)
        }
        
    }

    return (
        <div className="dashboard__sidebar">
            <div className="addItem__container">
                <ButtonTertiary onClick={()=>toggleAdding(!adding)} id="addItem">
                    { !adding ? (
                        <span>Add chart <i className="fad fa-plus-square"></i></span>
                    ) : (
                        <span>Cancel</span>
                    ) }
                </ButtonTertiary>
            </div>
            { adding && (
                <div className="dashboard__sidebar-adding">
                    <div className="sidebar__item">
                        <Select
                            id="select"
                            isMulti
                            onChange={add}
                            name="colors"
                            options={props.filterables}
                            className={`basic-multi-select ${error ? 'error' : ''}`}
                            classNamePrefix="select"
                        />
                    </div>
                    <ButtonPrimary
                        onClick={onSave}
                        id="addChart">
                        Save
                    </ButtonPrimary>
                </div>
            )}
            

            { Object.keys(chartListings).map( (chart: string) => (
                <SidebarItem
                    editChart={props.editChart}
                    deleteChart={props.deleteChart}
                    uid={chart}
                    metrics={chartListings[chart].metrics}
                    chartType={chartListings[chart].chartType}
                    filterables={props.filterables} />
            ))}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        chartListings: state.dashboardReducer.charts
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        editChart: (chart: any) => dispatch(editChart(chart)),
        addChart: (chart: initChart) => dispatch(addChart(chart)),
        deleteChart: (uid: string) => dispatch(deleteChart(uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer)

