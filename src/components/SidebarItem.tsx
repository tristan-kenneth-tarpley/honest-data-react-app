import React, { useState } from "react";
import { IMetric } from "../types";
import { ButtonSecondary, ButtonTertiary } from "./ui/Buttons";
import { decamelize } from "../helpers";
import { ChartItemEditing } from "./ChartItemEditing";
import { ISidebarItem } from "./charts/chartManagementTypes";
import { Text, Helper } from "./ui/Typography";

const SidebarItemInfoView: React.FC = (props: any) => {
  return (
    <React.Fragment>
      {props.chartDisplayName && (
        <Text size="lg" len="long">
          <strong>{props.chartDisplayName}</strong>
        </Text>
      )}
      <Text size="sm" len="short">
        {props.metrics.map((metric_: IMetric, index: number) => {
          return `${metric_.label}${
            index < props.metrics.length - 1 ? " + " : ""
          }`;
        })}
      </Text>
      <Helper>
        <strong>{decamelize(props.chartType)} chart</strong>
      </Helper>
      {props.from && props.to && (
        <span className="helper sub chart-info">
          <strong>
            {`${props.from.month}-${props.from.day}-${props.from.year} `}
            to {`${props.to.month}-${props.to.day}-${props.to.year}`}
          </strong>
        </span>
      )}
    </React.Fragment>
  );
};

const DeleteConfirmation: React.FC = (props: any) => {
  return (
    <div className="confirmation">
      <p>Are you sure you want to delete this chart?</p>
      <ButtonTertiary
        onClick={() => props.toggleDeleteConfirmation(false)}
        id="cancel"
      >
        Cancel
      </ButtonTertiary>
      <ButtonSecondary onClick={props.onDelete} id="confirm">
        Confirm
      </ButtonSecondary>
    </div>
  );
};

export const SidebarItem: React.FC<ISidebarItem> = (props) => {
  const [editing, toggleEditing] = useState(false);
  const [deleteConfirmation, toggleDeleteConfirmation] = useState(false);
  const [newChartWidth, setNewChartWidth] = useState(props.chartWidth);
  const [activeChartType, setActiveChartType] = useState(props.chartType);

  let filters: Array<IMetric> = props.metrics.map(
    (_metric: IMetric): IMetric => ({
      label: decamelize(_metric.label),
      value: _metric.value,
    })
  );
  const add = (ev: any) => {
    filters = ev.map((filter: IMetric) => ({
      label: filter.label,
      value: filter.value,
    }));
  };
  const onSave = () => {
    props.editChart({
      chartId: props.uid,
      filters,
    });
    props.editChartType({
      chartId: props.uid,
      chartType: activeChartType,
    });
    props.editChartWidth(newChartWidth, props.uid);
    toggleEditing(!editing);
  };

  const onDelete = () => {
    props.deleteChart(props.uid);
    toggleDeleteConfirmation(false);
  };

  const addtlProps = {
    editing,
    deleteConfirmation,
    newChartWidth,
    filters,
    add,
    onSave,
    onDelete,
    toggleEditing,
    toggleDeleteConfirmation,
    setNewChartWidth,
    activeChartType,
    setActiveChartType,
  };

  const shouldShow = props.allowableCharts?.includes(activeChartType);
  return (
    <div className={`${editing ? "editing" : ""} sidebar__item`}>
      {!deleteConfirmation ? (
        <React.Fragment>
          <div className="sidebar__item-info">
            {editing && shouldShow ? (
              <ChartItemEditing
                uid={props.uid}
                from={props.from}
                to={props.to}
                activeChartType={activeChartType}
                groupedByFields={props.groupedByFields}
                setGroupedBy={(groupedBy: any) =>
                  props.setGroupedBy({
                    chartId: props.uid,
                    groupedBy,
                  })
                }
                currentlyGroupedBy={props.currentlyGroupedBy}
                dataViewType={props.dataViewType}
                chartWidth={props.chartWidth}
                addFilterableToList={add}
                filters={filters}
                filterables={props.filterables}
                setActiveChartType={setActiveChartType}
                setChartDateRange={props.setChartDateRange}
                setNewChartWidth={setNewChartWidth}
                toggleEditing={() => toggleEditing(!editing)}
                onSave={onSave}
                setChartName={props.setChartName}
                chartDisplayName={props.chartDisplayName}
              />
            ) : (
              <SidebarItemInfoView {...props} />
            )}
          </div>
          {!editing && shouldShow && (
            <div className="sidebar__item-edit">
              <i
                onClick={() => toggleDeleteConfirmation(true)}
                className="red far fa-times"
              />
              <i
                onClick={() => {
                  toggleEditing(!editing);
                }}
                className="fad fa-edit"
              />
            </div>
          )}
        </React.Fragment>
      ) : (
        <DeleteConfirmation {...props} {...addtlProps} />
      )}
    </div>
  );
};
