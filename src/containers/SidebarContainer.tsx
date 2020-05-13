import React from 'react'
import {ButtonTertiary} from '../styles/Buttons'

interface sidebarItem {
    children: React.ReactNode
    chartType?: string
}
const SidebarItem: React.FC<sidebarItem> = (props) => {
    return (
        <div className="sidebar__item">
            <div className="sidebar__item-info">
                <p>{props.children}</p> 
                <span className="helper sub chart-info">Line chart</span>
            </div>
            <div className="sidebar__item-edit">
                <i className="fad fa-edit"></i>
            </div>
        </div>
        
    )
}

const DashboardSidebar: React.FC = () => {
    return (
        <div className="dashboard__sidebar">
            <div className="addItem__container">
                <ButtonTertiary id="addItem">
                    Add chart <i className="fad fa-plus-square"></i>
                </ButtonTertiary>
            </div>

            <SidebarItem>
                Positive cases
            </SidebarItem>
            <SidebarItem>
                Deaths,<br /> Date,<br />In ICU currently
            </SidebarItem>
            <SidebarItem>Test</SidebarItem>
        </div>
    )
}

export default DashboardSidebar

