import React, {useState} from 'react'
import { editChart } from '../actions/dashboardActions'

interface sidebarItem {
    children: React.ReactNode
    chartType: string
    uid: string
    editChart: ()=>void
    editing?: boolean
}

export const SidebarItem: React.FC<sidebarItem> = (props) => {
    const [editing, toggleEditing] = useState(false)
    return (
        <div className="sidebar__item">
            <div className="sidebar__item-info">
                {!editing ? (
                    <React.Fragment>
                        <p>{props.children}</p> 
                        <span className="helper sub chart-info">{props.chartType} chart</span>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <p onClick={()=>props.editChart()}>hello</p>
                    </React.Fragment>
                )}
            </div>
            <div onClick={()=>toggleEditing(!editing)} className="sidebar__item-edit">
                <i className="fad fa-edit"></i>
            </div>
        </div>   
    )
}