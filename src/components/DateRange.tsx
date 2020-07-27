import React, { useState } from "react";
import Styles from "../styles/Styles";
// date picker
import DatePicker, { DayRange } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { IDate } from "../types";
const classNames = require("classnames");

interface IDateRange {
  setDateRange: (_date: DayRange, chartId?: string) => void;
  from?: DayRange["from"];
  to?: DayRange["to"];
  chartId?: string;
  padding?: boolean;
}
export const DateRange: React.FC<IDateRange> = ({
  setDateRange,
  from,
  to,
  chartId,
  padding,
}) => {
  const parseDate = ({ day, month, year }: IDate) => `${month}-${day}-${year}`;

  const customEl = ({ ref }: any) => {
    return (
      <input
        readOnly
        ref={ref} // necessary
        placeholder="I'm a custom input"
        value={
          from && to
            ? `${parseDate(from)} to ${parseDate(to)}`
            : `...... to ......`
        }
        style={{
          textAlign: "center",
          cursor: "pointer",
          padding: "1rem",
          border: `none`,
          borderRadius: "10px",
          width: "100%",
          color: Styles.purple,
          outline: "none",
        }}
        className="custom-range-input" // a styling class
      />
    );
  };

  const setDate = (dayRange: DayRange) => {
    if (chartId) {
      setDateRange({ from: dayRange.from, to: dayRange.to }, chartId);
      return;
    }

    setDateRange({
      from: dayRange.from,
      to: dayRange.to,
    });
  };

  return (
    <div
      className={classNames({
        dateRange__container: true,
        padding: padding ? true : false,
      })}
    >
      <div className="dateRange__container-flex">
        <DatePicker
          value={{ from, to }}
          renderInput={customEl}
          onChange={setDate}
        />
      </div>
    </div>
  );
};
