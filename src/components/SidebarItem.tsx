import React, {useState} from 'react'
import {chartItem} from '../types'
import Select from 'react-select'
import {filterable} from '../types'
import { ButtonTertiary} from '../styles/Buttons'

interface sidebarItem {
    children: React.ReactNode
    chartType: string
    uid: string
    filterables: Array<filterable>
    editChart: (chart: chartItem)=>void
    editing?: boolean
}

export const SidebarItem: React.FC<sidebarItem> = (props) => {
    const [editing, toggleEditing] = useState(false)
    console.log(props.filterables)
    return (
        <div className={`${editing ? 'editing' : ''} sidebar__item`}>
            <div className="sidebar__item-info">
                {!editing ? (
                    <React.Fragment>
                        <p>{props.children}</p> 
                        <span className="helper sub chart-info">{props.chartType} chart</span>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Select
                            id="select"
                            defaultValue={props.filterables[0]}
                            isMulti
                            name="colors"
                            options={props.filterables}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                        {/* <p onClick={()=>props.editChart('test')}>hello</p> */}
                    </React.Fragment>
                )}
            </div>
            <div
                onClick={()=>toggleEditing(!editing)}
                className={`${editing ? 'editing' : ''} sidebar__item-edit`}>

                {!editing ? (
                    <i className="fad fa-edit"></i>
                ) : (
                    <ButtonTertiary id="sidebar__item-save">Save</ButtonTertiary>
                )}
            </div>
        </div>   
    )
}