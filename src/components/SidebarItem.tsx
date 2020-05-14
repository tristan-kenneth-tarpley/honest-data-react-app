import React, {useState} from 'react'
import {chartListing} from '../types'
import Select from 'react-select'
import {filterable, metric} from '../types'
import { ButtonTertiary} from '../styles/Buttons'
import {editchart} from '../actions/dashboardActions'
import { decamelize } from '../helpers'

interface sidebarItem {
    chartType: string
    uid: string
    filterables: Array<filterable>
    editChart: (chart: editchart)=>void
    metrics: Array<metric>
    editing?: boolean
}

const SidebarItemInfoView: React.FC<{
    metrics: Array<metric>
    chartType: string
}> = (props) => {
    return (
    <React.Fragment>
        <p>
            {props.metrics.map((metric_: metric, index:number)=> {
                return (
                    `${metric_.label}${index < props.metrics.length - 1
                        ? ", "
                        : ''}`
                )
            })}
        </p>
        <span className="helper sub chart-info">{props.chartType} chart</span>
    </React.Fragment>
    )
}

export const SidebarItem: React.FC<sidebarItem> = (props) => {
    const [editing, toggleEditing] = useState(false)
    const [deleteConfirmation, toggleDeleteConfirmation] = useState(false)
    let filters: Array<metric> = props.metrics.map((_metric: metric): metric => {
        return ({
            label: decamelize(_metric.label),
            value: _metric.value
        })
    })
    const add = (ev: any) => {
        filters = ev.map((filter:metric)=>({
            label: filter.label,
            value: filter.value
        })
    )}
    const onSave = () => {
        props.editChart({
            chartId: props.uid,
            filters
        })
        toggleEditing(!editing)
    }

    return (
        <div className={`${editing ? 'editing' : ''} sidebar__item`}>
            <div className="sidebar__item-info">

                {!editing ? (
                    <React.Fragment>

{/* <i onClick={()=>toggleDeleteConfirmation(!deleteConfirmation)}
                        className="red fad fa-backspace"></i> */}
                        <SidebarItemInfoView 
                            metrics={filters}
                            chartType={props.chartType}
                        />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {deleteConfirmation ? (
                            <p>hi</p>
                        ) : (
                            <Select
                                id="select"
                                isMulti
                                onChange={add}
                                defaultValue={filters}
                                name="colors"
                                options={props.filterables}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
            <div className={`${editing ? 'editing' : ''} sidebar__item-edit`}>
                {!editing ? (
    
                    <i onClick={()=>toggleEditing(!editing)}
                        className="fad fa-edit">    
                        </i>
     
                ) : (
                    <React.Fragment>
                        <ButtonTertiary
                            onClick={()=>toggleEditing(!editing)}
                            id="sidebar__item-save">
                            Cancel
                        </ButtonTertiary>
                        <ButtonTertiary
                            onClick={onSave}
                            id="sidebar__item-save">
                            Save
                        </ButtonTertiary>
                    </React.Fragment>
                )}
            </div>
        </div>   
    )
}