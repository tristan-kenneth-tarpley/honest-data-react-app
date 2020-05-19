import React, {useState} from 'react'
import Styles from '../styles/Styles'
import {Helper} from '../styles/Typography'
// date picker
import DatePicker, { DayValue, DayRange, Day } from 'react-modern-calendar-datepicker'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { ButtonTertiary } from '../styles/Buttons';
import { date } from '../types'

interface dateRange {
    setDateRange: (_date: DayRange, chartId?: string) => void
    from?: DayRange['from']
    to?: DayRange['to']
    chartId?: string
    padding?: boolean
}
export const DateRange: React.FC<dateRange> = (props) => {
    const [dayRange, setDayRange] = useState<DayRange>({
        from: props.from,
        to: props.to
    });
    const [showSave, toggleShowSave] = useState(false)
    const parseDate = ({ day, month, year }: date) => `${month}-${day}-${year}`
    const onSelect = ({from, to}: DayRange) => {
        setDayRange({from, to})
        toggleShowSave(true)
    }

    const customEl = ({ref}: any) => {
        return (
            <input
                readOnly
                ref={ref} // necessary
                placeholder="I'm a custom input"
                value={dayRange.from && dayRange.to ? (
                    `${parseDate(dayRange.from)} to ${parseDate(dayRange.to)}`
                ) : (
                    `...... to ......`
                )}
                style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    padding: '1rem',
                    border: `none`,
                    borderRadius: '10px',
                    width: '20em',
                    color: Styles.purple,
                    outline: 'none',
                }}
                className="custom-range-input" // a styling class
        />

        )
    }

    const setDate = () => {
        if (props.chartId) { 
            props.setDateRange({
                from: dayRange.from,
                to: dayRange.to
            }, props.chartId)
        } else {
            props.setDateRange({
                from: dayRange.from,
                to: dayRange.to
            })
        }
        toggleShowSave(false)
    }

    return (
        <div className={`dateRange__container ${props.padding ? 'padding' : ''}`}>
            <div className="dateRange__container-flex">
                <DatePicker
                    value={dayRange} 
                    renderInput={customEl}
                    onChange={onSelect} />
            </div>
            { showSave && (
                <ButtonTertiary onClick={() => setDate()} id="saveDate">Save</ButtonTertiary> 
            )}
        </div>
    )
}