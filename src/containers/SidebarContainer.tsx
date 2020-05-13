import React from 'react'
import {ButtonTertiary} from '../styles/Buttons'

interface sidebarItem {
    children: React.ReactNode
    chartType: string
    uid: string
}
const SidebarItem: React.FC<sidebarItem> = (props) => {
    return (
        <div className="sidebar__item">
            <div className="sidebar__item-info">
                <p>{props.children}</p> 
                <span className="helper sub chart-info">{props.chartType} chart</span>
            </div>
            <div className="sidebar__item-edit">
                <i className="fad fa-edit"></i>
            </div>
        </div>
        
    )
}

interface sidebar {
    charts: Array<any>
}

const DashboardSidebar: React.FC<sidebar> = (props) => {
    return (
        <div className="dashboard__sidebar">
            <div className="addItem__container">
                <ButtonTertiary id="addItem">
                    Add chart <i className="fad fa-plus-square"></i>
                </ButtonTertiary>
            </div>

            {props.charts.map((chart)=>{
                return (
                    <SidebarItem uid={chart.uid} chartType={chart.chartType}>
                        {chart.metrics.map((metric: string, index:number)=> {
                            return (
                                `${metric}${index < chart.metrics.length - 1
                                    ? ", "
                                    : ''}`
                            )
                        })}
                    </SidebarItem>
                )
            })}
        </div>
    )
}

export default DashboardSidebar

