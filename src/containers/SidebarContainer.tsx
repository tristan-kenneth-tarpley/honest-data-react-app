import React, {useState} from 'react'
import {ButtonPrimary, ButtonTertiary} from '../styles/Buttons'
import {SidebarItem} from '../components/SidebarItem'
import { connect } from 'react-redux'
import Select from 'react-select'
import {editChart, addChart, initChart
} from '../actions/dashboardActions'
import {getFilterables} from '../apiUtils/filterables'
import {chartListing, metric} from '../types'

interface sidebar {
    data: any
    charts: Array<chartListing>
    editChart: any
    addChart: (chart: initChart) => void
}

const DashboardSidebar: React.FC<sidebar> = (props) => {
    const filterables = getFilterables(props.data)
    const [adding, toggleAdding] = useState(true)
    let disabled = false

    const addButton = !adding ? (
        <span>Add chart <i className="fad fa-plus-square"></i></span>
    ) : (
        <span>Cancel</span>
    )
    let filters: Array<metric> = []

    const add = (ev: any) => {
        filters = ev.map((filter:metric)=>({
            label: filter.label,
            value: filter.value
        })
    )}
    const onSave = () => {
        console.log(filters)
        props.addChart({
            metrics: filters,
            chartType: "line"
        })
        disabled = true
    }


    return (
        <div className="dashboard__sidebar">
            <div className="addItem__container">
                <ButtonTertiary onClick={()=>toggleAdding(!adding)} id="addItem">
                    { addButton }
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
                            options={filterables}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>
                    <ButtonPrimary
                        disabled={disabled}
                        onClick={onSave}
                        id="addChart">
                        Save
                    </ButtonPrimary>
                </div>
            )}
            

            {Object.keys(props.charts).map( (chart: any) => (
                <SidebarItem
                    editChart={props.editChart}
                    uid={chart}
                    metrics={props.charts[chart].metrics}
                    chartType={props.charts[chart].chartType}
                    filterables={filterables} />
            ))}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        charts: state.dashboardReducer.charts
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        editChart: (chart: any) => dispatch(editChart(chart)),
        addChart: (chart: initChart) => dispatch(addChart(chart))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSidebar)

