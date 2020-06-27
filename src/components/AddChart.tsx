import React, {useState} from 'react'
import Select from 'react-select'
import { filterable, viewTypes } from '../types'
import { ButtonPrimary } from '../styles/Buttons'
import { getAllowableChartTypes, ChartSelection } from './charts/ChartSelection'

const AddChart: React.FC<{
    add: (ev: any) => void
    filterables: Array<filterable>
    error: boolean
    onSave: () => void
    dataViewType: viewTypes
}> = ({
    add,
    filterables,
    error,
    onSave,
    dataViewType
}) => {
    const [activeChartType, setActiveChartType] = useState("line")
    return (
        <div className="dashboard__sidebar-adding">
            <div className="sidebar__item">
                <Select
                    id="select"
                    isMulti
                    onChange={add}
                    name="colors"
                    options={filterables}
                    className={`basic-multi-select ${error ? 'error' : ''}`}
                    classNamePrefix="select"
                />
                <ChartSelection
                    dataViewType={dataViewType}
                    activeChartType={activeChartType}
                    setActiveChartType={setActiveChartType}
                />
            </div>
            <ButtonPrimary
                onClick={onSave}
                id="addChart">
                Save
            </ButtonPrimary>
        </div>
    )
}

export default AddChart