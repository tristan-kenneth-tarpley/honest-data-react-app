import React, { useState, Dispatch, SetStateAction } from "react";
import { filterable, viewTypes } from "../types";
import { ButtonPrimary, ButtonTertiary } from "../styles/Buttons";
import { ChartSelection } from "./charts/ChartSelection";
import Select from "react-select";
import { Text } from "../styles/Typography";
import { DateRange } from "./DateRange";
import { DayRange } from "react-modern-calendar-datepicker";

const classNames = require("classnames");

export const ChartItemEditing: React.FC<{
  from: DayRange["from"];
  to: DayRange["to"];
  dataViewType: viewTypes;
  filterables: Array<filterable>;
  error?: boolean;
  setActiveChartType: any; //(() => void) | Dispatch<SetStateAction<string>>;
  setChartDateRange: any; //({ from, to }: DayRange, chartId: string) => void;
  setNewChartWidth: (newChartWidth: number) => void;
  onSave: () => void;
  addFilterableToList: (ev: any) => void;
  chartWidth?: number;
  activeChartType?: string;
  uid?: string;
  adding?: boolean;
  toggleEditing?: () => void;
  filters?: Array<any>;
}> = (props) => {
  const [date, renderDate] = useState<{
    from?: DayRange["from"];
    to?: DayRange["to"];
  }>({
    from: props.from,
    to: props.to,
  });

  const onResetDate = () => {
    if (props.uid)
      props.setChartDateRange(
        {
          from: undefined,
          to: undefined,
        },
        props.uid
      );
    renderDate({ from: undefined, to: undefined });
  };

  const colWidths = [
    { label: "100%", value: 12 },
    { label: "75%", value: 9 },
    { label: "66%", value: 8 },
    { label: "50%", value: 6 },
    { label: "33%", value: 4 },
    { label: "25%", value: 3 },
  ];

  return (
    <div
      className={classNames({
        "chart-item-editing__container": true,
        adding: props.adding,
        editing: !props.adding,
      })}
    >
      {props.dataViewType === viewTypes.timeSeries && (
        <React.Fragment>
          <Text size="sm" len="long">
            Date range:
            <span onClick={() => onResetDate()} className="reset">
              reset to default{" "}
            </span>
          </Text>
          <DateRange
            from={date.from ? date.from : props.from}
            to={date.to ? date.to : props.to}
            chartId={props.uid}
            setDateRange={(_date: DayRange) => {
              props.setChartDateRange(_date);
              renderDate({ from: _date.from, to: _date.to });
            }}
          />
        </React.Fragment>
      )}
      <Text size="sm" len="short">
        Chart type:
      </Text>
      <div className="sidebar__item-edit-chartSelector">
        <ChartSelection
          dataViewType={props.dataViewType}
          setActiveChartType={props.setActiveChartType}
          activeChartType={props.activeChartType!}
        />
      </div>
      <br />
      <Text size="sm" len="short">
        Chart width:
      </Text>
      <Select
        id="select"
        defaultValue={colWidths.filter((w) => w.value === props.chartWidth)[0]}
        name="colors"
        options={colWidths}
        onChange={(e: any) => props.setNewChartWidth(e.value)}
        classNamePrefix="select"
      />
      <br />
      <Text size="sm" len="short">
        Select the fields to view:
      </Text>
      <Select
        id="select"
        isMulti
        onChange={props.addFilterableToList}
        defaultValue={props.filters}
        name="colors"
        options={props.filterables}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      <div className="confirm__container">
        {props.adding ? (
          <ButtonPrimary onClick={props.onSave} id="addChart">
            Add
          </ButtonPrimary>
        ) : (
          <React.Fragment>
            <ButtonTertiary
              onClick={props.toggleEditing}
              id="sidebar__item-save"
            >
              Cancel
            </ButtonTertiary>
            <ButtonTertiary onClick={props.onSave} id="sidebar__item-save">
              Save
            </ButtonTertiary>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ChartItemEditing;
