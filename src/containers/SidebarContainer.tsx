import React from 'react'
import {ButtonTertiary} from '../styles/Buttons'
import {SidebarItem} from '../components/SidebarItem'
import { connect } from 'react-redux'
import {editChart
} from '../actions/dashboardActions'
import {getFilterables} from '../apiUtils/filterables'
import {chartItem} from '../types'

interface sidebar {
    data: any
    charts: Array<chartItem>
    editChart: (chart: chartItem)=>void
}

const DashboardSidebar: React.FC<sidebar> = (props) => {
    const filterables = getFilterables(props.data)
    return (
        <div className="dashboard__sidebar">
            <div className="addItem__container">
                <ButtonTertiary id="addItem">
                    Add chart <i className="fad fa-plus-square"></i>
                </ButtonTertiary>
            </div>

            {Object.keys(props.charts).map( (chart: any) => (
                <SidebarItem
                    editChart={() => props.editChart(props.charts[chart])}
                    uid={chart}
                    chartType={props.charts[chart].chartType}
                    filterables={filterables}>
                    {props.charts[chart].metrics.map((metric: string, index:number)=> {
                        return (
                            `${metric}${index < props.charts[chart].metrics.length - 1
                                ? ", "
                                : ''}`
                        )
                    })}
                </SidebarItem>
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
        editChart: (chart: chartItem) => dispatch(editChart(chart))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSidebar)

