import React, {useState} from 'react'
import Select from 'react-select'
import {filterable, metric} from '../types'
import { ButtonSecondary, ButtonTertiary } from '../styles/Buttons'
import {editchart, editChartWidth} from '../actions/dashboardActions'
import { decamelize } from '../helpers'


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

const DeleteConfirmation: React.FC<{
    toggleDeleteConfirmation: (cond: boolean) => void
    onDelete: () => void
}> = props => {
    return (
        <div className="confirmation">
            <p>Are you sure you want to delete this chart?</p>
            <ButtonTertiary
                onClick={()=>props.toggleDeleteConfirmation(false)}
                id="cancel">
                Cancel
            </ButtonTertiary>
            <ButtonSecondary
                onClick={props.onDelete}
                id="confirm">
                Confirm
            </ButtonSecondary>
        </div>
    )
}



const SidebarEdit:React.FC<{
    editing: boolean
    toggleDeleteConfirmation: (cond: boolean) => void
    toggleEditing: (cond: boolean) => void
    onSave: () => void
    chartWidth: number
}> = props => {
    return (
        <div className="sidebar__item-edit">
            {!props.editing ? (
                <React.Fragment>
                    <i onClick={()=>props.toggleDeleteConfirmation(true)}
                    className="red far fa-times">    
                    </i>
                    <i onClick={()=>props.toggleEditing(!props.editing)}
                        className="fad fa-edit">    
                    </i>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <ButtonTertiary
                        onClick={()=>props.toggleEditing(!props.editing)}
                        id="sidebar__item-save">
                        Cancel
                    </ButtonTertiary>
                    <ButtonTertiary
                        onClick={props.onSave}
                        id="sidebar__item-save">
                        Save
                    </ButtonTertiary>
                </React.Fragment>
            )}
        </div>
    )
}
// cleanup these interfaces and props

const SidebarInfo: React.FC<{
    editing: boolean
    filters: sidebarItem["metrics"]
    chartType: sidebarItem["chartType"]
    add: (ev: any) => void
    setNewChartWidth: (ev: number) => void
    chartWidth: number
    filterables: sidebarItem["filterables"]
}> = props => {
    const colWidths = [
        {label: "100%", value: 12},
        {label: "75%", value: 9},
        {label: "66%", value: 8},
        {label: "50%", value: 6},
        {label: "33%", value: 4},
        {label: "25%", value: 3},
    ]
    
    return (
        <div className="sidebar__item-info">
        {!props.editing ? (
            <SidebarItemInfoView 
                metrics={props.filters}
                chartType={props.chartType}
            />
        ) : (
            <React.Fragment>
                <p className="helper">Chart width:</p>
                <Select
                    id="select"
                    defaultValue={colWidths.filter(w=>w.value === props.chartWidth)[0]}
                    name="colors"
                    options={colWidths}
                    onChange={(e: any)=>props.setNewChartWidth(e.value)}
                    classNamePrefix="select"
                />
                <br/>
                <p className="helper">Select the fields to view:</p>
                <Select
                    id="select"
                    isMulti
                    onChange={props.add}
                    defaultValue={props.filters}
                    name="colors"
                    options={props.filterables}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </React.Fragment>
        )}
        </div>
    )
}





interface sidebarItem {
    chartType: string
    uid: string
    filterables: Array<filterable>
    editChart: (chart: editchart)=>void
    deleteChart: (uid: string) => void
    editChartWidth: (width: number, chartId:string) => void
    metrics: Array<metric>
    editing?: boolean
    chartWidth: number
}

export const SidebarItem: React.FC<sidebarItem> = (props) => {
    
    const [editing, toggleEditing] = useState(false)
    const [deleteConfirmation, toggleDeleteConfirmation] = useState(false)
    const [newChartWidth, setNewChartWidth] = useState(props.chartWidth)

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
        props.editChartWidth(newChartWidth, props.uid)
        toggleEditing(!editing)
        // onWidthEdit()
    }


    // const onWidthEdit = (ev?: any) => {
    //     console.log(ev)
    //     // props.editChartWidth({
    //     //     width, chartId }
    //     // })
    // }

    const onDelete = () => {
        props.deleteChart(props.uid)
        toggleDeleteConfirmation(false)
    }

    return (
        <div className={`${editing ? 'editing' : ''} sidebar__item`}>
            { !deleteConfirmation ? (
                <React.Fragment>
                    <SidebarInfo
                        editing={editing}
                        filters={filters}
                        chartType={props.chartType}
                        add={add}
                        setNewChartWidth={setNewChartWidth}
                        filterables={props.filterables}
                        chartWidth={props.chartWidth}
                        />
                    <SidebarEdit
                        editing={editing}
                        toggleDeleteConfirmation={toggleDeleteConfirmation}
                        toggleEditing={toggleEditing}
                        onSave={onSave}
                        chartWidth={props.chartWidth}
                        />
                </React.Fragment>
            ) : (
                <DeleteConfirmation
                    toggleDeleteConfirmation={toggleDeleteConfirmation}
                    onDelete={onDelete}
                    />
            )}
        </div>  
    )
}