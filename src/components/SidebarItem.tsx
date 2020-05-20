import React, {useState} from 'react'
import Select from 'react-select'
import {filterable, metric, charts, viewTypes} from '../types'
import { ButtonSecondary, ButtonTertiary } from '../styles/Buttons'
import {editchart, editChartWidth} from '../actions/dashboardActions'
import { decamelize } from '../helpers'
import {Text, Helper} from '../styles/Typography'
import { DateRange } from './DateRange'
import { DayRange } from 'react-modern-calendar-datepicker'


const SidebarItemInfoView: React.FC = (props: any) => {
    return (
    <React.Fragment>
        <p>
            {props.metrics.map((metric_: metric, index:number)=> {
                return (
                    `${metric_.label}${index < props.metrics.length - 1
                        ? " + "
                        : ''}`
                )
            })}
        </p>
        <span className="helper sub chart-info">{decamelize(props.chartType)} chart</span>
        { (props.from && props.to) && (
            <span className="helper sub chart-info">
                {`${props.from.month}-${props.from.day}-${props.from.year} `}
                to {`${props.to.month}-${props.to.day}-${props.to.year}`}
            </span>  
        )}
    </React.Fragment>
    )
}

const DeleteConfirmation: React.FC = (props: any) => {
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



const SidebarEdit:React.FC = (props: any) => {
    return (
        <div className="sidebar__item-edit">
            {!props.editing ? (
                <React.Fragment>
                    <i onClick={()=>props.toggleDeleteConfirmation(true)}
                    className="red far fa-times">    
                    </i>
                    <i onClick={()=>{props.toggleEditing(!props.editing)}}
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



const Editing: React.FC = (props:any) => {
    const colWidths = [
        {label: "100%", value: 12},
        {label: "75%", value: 9},
        {label: "66%", value: 8},
        {label: "50%", value: 6},
        {label: "33%", value: 4},
        {label: "25%", value: 3},
    ]
    const {activeChartType, setActiveChartType} = props
    const [date, renderDate] = useState({
        from: props.from,
        to: props.to
    })

    const onSet = () => {
        props.setChartDateRange({
            from: undefined,
            to: undefined
        }, props.uid)
        renderDate({from: undefined, to: undefined})
    }


    const ChartIcon = (props: any) => {
        // console.log(props.)
        return (
            <div
                onClick={() => props.onClick(props.chartType)}
                className={`chartSelector__item
                ${props.activeChartType === props.chartType ? 'active' : ''}`
            }>
                { props.icon }
                <Helper>{props.displayName}</Helper>
            </div> 
        )
    }
    
    return (
        <React.Fragment>
            <Text size="sm" len="long">
                Date range:
                <span onClick={()=> onSet() } className="reset">reset to default </span>
            </Text>
            <DateRange
                from={date.from}
                to={date.to}
                chartId={props.uid}
                setDateRange={props.setChartDateRange} />
                
            <Text size="sm" len="short">Chart type:</Text>
            <div className="sidebar__item-edit-chartSelector">
                <ChartIcon
                    onClick={setActiveChartType}
                    activeChartType={activeChartType}
                    icon={<i className="fad fa-chart-line"></i>}
                    displayName="Line Chart"
                    chartType='line' />
                <ChartIcon
                    onClick={setActiveChartType}
                    activeChartType={activeChartType}
                    icon={<i className="fad fa-chart-bar"></i>}
                    displayName="Bar chart"
                    chartType='bar' />
                    
                { viewTypes[props.viewType] === "categorized" && 
                    <ChartIcon
                        onClick={setActiveChartType}
                        activeChartType={activeChartType}
                        icon={<i className="fad fa-chart-pie"></i>}
                        displayName="Pie Chart"
                        chartType='pie' />
                }
                {/* <ChartIcon
                    onClick={setActiveChartType}
                    activeChartType={activeChartType}
                    icon={<i className="fad fa-chart-scatter"></i>}
                    displayName="Scatter Plot"
                    chartType='scatterPlot' />
                <ChartIcon
                    onClick={setActiveChartType}
                    activeChartType={activeChartType}
                    icon={<i className="fad fa-analytics"></i>}
                    displayName="Dual Axis"
                    chartType='dualAxisLine' /> */}
            </div>
            <br />
            <Text size="sm" len="short">Chart width:</Text>
            <Select
                id="select"
                defaultValue={colWidths.filter(w=>w.value === props.chartWidth)[0]}
                name="colors"
                options={colWidths}
                onChange={(e: any)=>props.setNewChartWidth(e.value)}
                classNamePrefix="select"
            />
            <br/>
            <Text size="sm" len="short">Select the fields to view:</Text>
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
    )
}


const SidebarInfo: React.FC = (props: any) => {
    return (
        <div className="sidebar__item-info">
        {!props.editing ? (
            <SidebarItemInfoView {...props} />
        ) : (
            <Editing {...props} />
        )}
        </div>
    )
}





interface sidebarItem {
    chartType: string
    uid: string
    filterables: Array<filterable>
    viewType: number
    from: DayRange['from']
    to: DayRange['to']
    setChartDateRange: (_date: DayRange, chartId:string) => void
    editChart: (chart: editchart)=>void
    deleteChart: (uid: string) => void
    editChartWidth: (width: number, chartId:string) => void
    editChartType: (chart: {
        chartId: string
        chartType: string
    }) => void
    metrics: Array<metric>
    editing?: boolean
    chartWidth: number
}

export const SidebarItem: React.FC<sidebarItem> = (props) => {
    
    const [editing, toggleEditing] = useState(false)
    const [deleteConfirmation, toggleDeleteConfirmation] = useState(false)
    const [newChartWidth, setNewChartWidth] = useState(props.chartWidth)
    const [activeChartType, setActiveChartType] = useState(props.chartType)
    
    
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
        props.editChartType({
            chartId: props.uid,
            chartType: activeChartType
        })
        props.editChartWidth(newChartWidth, props.uid)
        toggleEditing(!editing)
    }

    const onDelete = () => {
        props.deleteChart(props.uid)
        toggleDeleteConfirmation(false)
    }

    const addtlProps = {
        editing, deleteConfirmation, newChartWidth, filters,
        add, onSave, onDelete, toggleEditing, toggleDeleteConfirmation,
        setNewChartWidth, activeChartType, setActiveChartType
    }

    return (
        <div className={`${editing ? 'editing' : ''} sidebar__item`}>
            { !deleteConfirmation ? (
                <React.Fragment>
                    <SidebarInfo {...props} {...addtlProps} />
                    <SidebarEdit {...props} {...addtlProps} />
                </React.Fragment>
            ) : (
                <DeleteConfirmation {...props} {...addtlProps} />
            )}
        </div>  
    )
}