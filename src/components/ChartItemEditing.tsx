import React, { useState } from "react";
import { IFilterable, ViewTypes, Charts } from "../types";
import { ButtonPrimary, ButtonTertiary } from "../styles/Buttons";
import { ChartSelection } from "./charts/ChartSelection";
import Select from "react-select";
import { Text } from "../styles/Typography";
import { DateRange } from "./DateRange";
import { DayRange } from "react-modern-calendar-datepicker";
// @ts-ignore
import { IChartItemEditing } from "./charts/chartManagementTypes";

const classNames = require("classnames");

export const ChartItemEditing: React.FC<IChartItemEditing> = (props) => {
  const [date, renderDate] = useState<{
    from?: DayRange["from"];
    to?: DayRange["to"];
  }>({
    from: props.from,
    to: props.to,
  });

  const onResetDate = () => {
    if (props.uid) {
      props.setChartDateRange(
        {
          from: undefined,
          to: undefined,
        },
        props.uid
      );
    }
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
      {props.dataViewType === ViewTypes.timeSeries && (
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
              renderDate({ from: _date.from, to: _date.to });
              if (_date.from && _date.to) {
                props.setChartDateRange(_date, props.uid);
              }
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
      {props.activeChartType && (
        <React.Fragment>
          <Text size="sm" len="short">
            Chart width:
          </Text>
          <Select
            id="select"
            defaultValue={
              colWidths.filter((w) => w.value === props.chartWidth)[0]
            }
            name="colors"
            options={colWidths}
            onChange={(e: any) => {
              if (!e || e.length === 0) return;
              props.setNewChartWidth(e.value);
            }}
            classNamePrefix="select"
          />
          <br />
          <Text size="sm" len="short">
            Select the fields to view:
          </Text>
          <Select
            id="select"
            isMulti={props.activeChartType !== "pie"}
            onChange={(ev: any) => {
              if (!ev || ev.length === 0) return;
              props.addFilterableToList(ev.length ? ev : [ev]);
            }}
            defaultValue={props.filters}
            name="colors"
            options={props.filterables}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <br />
        </React.Fragment>
      )}

      {props.dataViewType === ViewTypes.categorized && props.groupedByFields && (
        <React.Fragment>
          {props.activeChartType === "pie" && (
            <React.Fragment>
              <Text size="sm" len="short">
                Group by:
              </Text>
              <Select
                id="select"
                isMulti
                onChange={(ev: any) => {
                  if (!ev || ev.length === 0) return;
                  props.setGroupedBy(ev);
                }}
                defaultValue={props.currentlyGroupedBy}
                name="groupBy"
                options={props.groupedByFields}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </React.Fragment>
          )}
        </React.Fragment>
      )}

      <div className="confirm__container">
        {props.adding ? (
          <ButtonPrimary
            disabled={props.valid === false ? true : false}
            onClick={props.onSave}
            id="addChart"
          >
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
