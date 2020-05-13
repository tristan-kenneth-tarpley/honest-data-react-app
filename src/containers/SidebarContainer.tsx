import React from 'react'
import {ButtonTertiary} from '../styles/Buttons'
import {SidebarItem} from '../components/SidebarItem'
import { chartItem } from '../types'

interface sidebar {
    charts: Array<any>
    editChart: () => void
}

const DashboardSidebar: React.FC<sidebar> = (props) => {
    return (
        <div className="dashboard__sidebar">
            <div className="addItem__container">
                <ButtonTertiary id="addItem">
                    Add chart <i className="fad fa-plus-square"></i>
                </ButtonTertiary>
            </div>

            {Object.keys(props.charts).map( (chart: any) => (
                <SidebarItem editChart={props.editChart} uid={chart} chartType={props.charts[chart].chartType}>
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

export default DashboardSidebar

