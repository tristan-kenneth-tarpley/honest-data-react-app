import React, { useState, useReducer, useMemo } from "react";
import { ButtonTertiary } from "../styles/Buttons";
import { SidebarItem } from "../components/SidebarItem";
import { connect } from "react-redux";
import {
  editChart,
  addChart,
  deleteChart,
  editChartWidth,
  editChartType,
  setChartDateRange,
  setChartOrderOnPage,
  groupChartBy,
} from "../actions/dashboardActions";
import {
  IChartListing,
  ISafeChartListing,
  IMetric,
  IFilterable,
  ViewTypes,
} from "../types";
import { v4 as uuidv4 } from "uuid";
import { DayRange } from "react-modern-calendar-datepicker";
import { ChartItemEditing } from "../components/ChartItemEditing";
import { sortChartKeys } from "../utils/sortChartKeys";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface sidebarContainer {
  filterables: Array<IFilterable>;
  chartListings: { [key: string]: IChartListing };
  editChart: any;
  viewType: number;
  from: DayRange["from"];
  to: DayRange["to"];
  dataViewType: ViewTypes;
  groupedByFields: Array<IFilterable>;
  setGroupedBy: ({
    chartId,
    groupedBy,
  }: {
    chartId: string;
    groupedBy: Array<IFilterable>;
  }) => void;
  addChart: (chart: ISafeChartListing) => void;
  deleteChart: (uid: string) => void;
  editChartWidth: (width: number, chartId: string) => void;
  editChartType: (chart: { chartId: string; chartType: string }) => void;
  setChartDateRange: (_date: DayRange, chartId: string) => void;
  setChartOrderOnPage: ({
    previousOrder,
    desiredOrder,
    chartId,
  }: {
    previousOrder: number;
    desiredOrder: number;
    chartId: string;
  }) => void;
}

const BuildChartReducer = (
  state: ISafeChartListing,
  action: { type: string; payload: any }
): ISafeChartListing => {
  const { type, payload } = action;
  const { uid } = payload;

  switch (type) {
    case "CHART_TYPE":
      state = {
        [uid]: {
          ...state[uid],
          uid,
          chartType: payload.chartType,
        },
      };
      break;
    case "CHART_DATE_RANGE":
      state = {
        [uid]: {
          ...state[uid],
          uid,
          from: payload.dateRange.from,
          to: payload.dateRange.to,
        },
      };
      break;
    case "CHART_WIDTH":
      state = {
        [uid]: {
          ...state[uid],
          uid,
          width: payload.width,
        },
      };
      break;
    case "ADD_FILTERABLE":
      state = {
        [uid]: {
          ...state[uid],
          uid,
          metrics: [...payload.filterableToAdd],
        },
      };
      break;
    case "GROUP_BY":
      state = {
        [uid]: {
          ...state[uid],
          uid,
          groupedBy: [...payload.groupedBy],
        },
      };
      break;
    default:
      return state;
  }

  return state;
};

const SidebarContainer: React.FC<sidebarContainer> = (props) => {
  const { chartListings } = props;
  const sortedChartKeys = sortChartKeys(chartListings);
  const [adding, toggleAdding] = useState(false);
  const [error, toggleError] = useState(false);

  const newChartUID = useMemo(() => uuidv4(), [adding]);
  const initialChartState = useMemo(
    () => ({
      [newChartUID]: {
        uid: newChartUID,
        metrics: [],
      },
    }),
    [adding]
  );
  const [newChartState, dispatchNewChart] = useReducer(
    BuildChartReducer,
    initialChartState
  );

  const onSave = () => {
    if (newChartState[newChartUID]?.metrics.length > 0) {
      props.addChart(newChartState);
      toggleError(false);
      toggleAdding(false);
    } else {
      toggleError(true);
    }
  };
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const chartId = result.draggableId;
    const desiredOrder = result.destination.index;
    const previousOrder = result.source.index;
    props.setChartOrderOnPage({ previousOrder, desiredOrder, chartId });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sidebar__container">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="dashboard__sidebar"
          >
            <div className="dashboard__sidebar-adding-toggle">
              <ButtonTertiary
                onClick={() => toggleAdding(!adding)}
                id="addItem"
              >
                {!adding ? (
                  <span>
                    Add chart <i className="fad fa-plus-square"></i>
                  </span>
                ) : (
                  <span>Cancel</span>
                )}
              </ButtonTertiary>
            </div>

            {adding && (
              <ChartItemEditing
                uid={newChartUID}
                filterables={props.filterables}
                error={error}
                dataViewType={props.dataViewType}
                from={newChartState[newChartUID]?.from}
                to={newChartState[newChartUID]?.to}
                groupedByFields={props.groupedByFields}
                activeChartType={newChartState[newChartUID]?.chartType}
                setActiveChartType={(chartType: string) =>
                  dispatchNewChart({
                    type: "CHART_TYPE",
                    payload: {
                      chartType,
                      uid: newChartUID,
                    },
                  })
                }
                setChartDateRange={(_date: DayRange) =>
                  dispatchNewChart({
                    type: "CHART_DATE_RANGE",
                    payload: {
                      dateRange: _date,
                      uid: newChartUID,
                    },
                  })
                }
                setNewChartWidth={(width: number) =>
                  dispatchNewChart({
                    type: "CHART_WIDTH",
                    payload: {
                      width,
                      uid: newChartUID,
                    },
                  })
                }
                setGroupedBy={(groupedBy: any) =>
                  dispatchNewChart({
                    type: "GROUP_BY",
                    payload: {
                      groupedBy,
                      uid: newChartUID,
                    },
                  })
                }
                addFilterableToList={(ev: any) =>
                  dispatchNewChart({
                    type: "ADD_FILTERABLE",
                    payload: {
                      filterableToAdd: ev.map((filter: IMetric) => ({
                        label: filter.label,
                        value: filter.value,
                      })),
                      uid: newChartUID,
                    },
                  })
                }
                onSave={onSave}
                adding={adding}
              />
            )}

            {sortedChartKeys.map((chart: string, index: number) => (
              <Draggable key={chart} draggableId={chart} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <SidebarItem
                      editChart={props.editChart}
                      key={chart}
                      deleteChart={props.deleteChart}
                      uid={chart}
                      from={
                        chartListings[chart].from
                          ? chartListings[chart].from
                          : props.from
                      }
                      to={
                        chartListings[chart].to
                          ? chartListings[chart].to
                          : props.to
                      }
                      viewType={props.viewType}
                      currentlyGroupedBy={chartListings[chart].groupedBy}
                      setGroupedBy={props.setGroupedBy}
                      groupedByFields={props.groupedByFields}
                      metrics={chartListings[chart].metrics}
                      chartWidth={chartListings[chart].width}
                      editChartWidth={props.editChartWidth}
                      editChartType={props.editChartType}
                      setChartDateRange={props.setChartDateRange}
                      chartOrderOnPage={chartListings[chart].orderOnPage}
                      chartType={chartListings[chart].chartType}
                      filterables={props.filterables}
                      dataViewType={props.dataViewType}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const mapStateToProps = (state: any) => {
  return {
    chartListings: state.dashboardReducer.charts,
    from: state.dashboardReducer.from,
    to: state.dashboardReducer.to,
    dataViewType: state.dashboardReducer.dataViewType,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setGroupedBy: ({
      chartId,
      groupedBy,
    }: {
      chartId: string;
      groupedBy: Array<IFilterable>;
    }) => dispatch(groupChartBy({ chartId, groupedBy })),
    setChartDateRange: (_date: DayRange, chartId: string) =>
      dispatch(setChartDateRange(_date, chartId)),
    editChart: (chart: any) => dispatch(editChart(chart)),
    editChartType: (chart: any) => dispatch(editChartType(chart)),
    addChart: (data: ISafeChartListing) => dispatch(addChart(data)),
    deleteChart: (uid: string) => dispatch(deleteChart(uid)),
    editChartWidth: (width: number, chartId: string) =>
      dispatch(editChartWidth(width, chartId)),
    setChartOrderOnPage: ({
      previousOrder,
      desiredOrder,
      chartId,
    }: {
      previousOrder: number;
      desiredOrder: number;
      chartId: string;
    }) =>
      dispatch(setChartOrderOnPage({ previousOrder, desiredOrder, chartId })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
