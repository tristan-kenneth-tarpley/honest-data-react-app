import React, { useState } from "react";
import { ButtonTertiary } from "../styles/Buttons";
import { SidebarItem } from "../components/SidebarItem";
import { connect } from "react-redux";
import {
    editChart,
    addChart,
    addChartInterface,
    deleteChart,
    editChartWidth,
    editChartType,
    setChartDateRange,
    setChartOrderOnPage,
} from "../actions/dashboardActions";
import { chartListing, metric, filterable, viewTypes } from "../types";
import { v4 as uuidv4 } from "uuid";
import { DayRange } from "react-modern-calendar-datepicker";
import { ChartItemEditing } from "../components/ChartItemEditing";
import { sortChartKeys } from "../utils/sortChartKeys";
interface sidebarContainer {
    filterables: Array<filterable>;
    chartListings: { [key: string]: chartListing };
    editChart: any;
    viewType: number;
    from: DayRange["from"];
    to: DayRange["to"];
    dataViewType: viewTypes;
    addChart: (chart: addChartInterface) => void;
    deleteChart: (uid: string) => void;
    editChartWidth: (width: number, chartId: string) => void;
    editChartType: (chart: { chartId: string; chartType: string }) => void;
    setChartDateRange: (_date: DayRange, chartId: string) => void;
    setChartOrderOnPage: ({
        desiredOrder,
        chartId,
    }: {
        desiredOrder: number;
        chartId: string;
    }) => void;
}

const SidebarContainer: React.FC<sidebarContainer> = (props) => {
    const { chartListings } = props;
    const sortedChartKeys = sortChartKeys(chartListings);
    const [adding, toggleAdding] = useState(false);
    const [error, toggleError] = useState(false);

    let filters: Array<metric> = [];
    const add = (ev: any) => {
        filters = ev.map((filter: metric) => ({
            label: filter.label,
            value: filter.value,
        }));
    };
    const onSave = () => {
        if (filters.length > 0) {
            props.addChart({
                uid: uuidv4(),
                metrics: filters,
                chartType: "line",
            });
            toggleError(false);
            toggleAdding(false);
        } else {
            toggleError(true);
        }
    };

    return (
        <div className="dashboard__sidebar">
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
                    filterables={props.filterables}
                    error={error}
                    dataViewType={props.dataViewType}
                    from={props.from}
                    to={props.to}
                    setActiveChartType={() => console.log("hi")}
                    setChartDateRange={() => console.log("hi")}
                    setNewChartWidth={() => console.log("hi")}
                    add={add}
                    onSave={onSave}
                    adding={adding}
                />
            )}

            {sortedChartKeys.map((chart: string) => {
                return (
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
                        metrics={chartListings[chart].metrics}
                        chartWidth={chartListings[chart].width}
                        editChartWidth={props.editChartWidth}
                        editChartType={props.editChartType}
                        setChartDateRange={props.setChartDateRange}
                        setChartOrderOnPage={props.setChartOrderOnPage}
                        chartType={chartListings[chart].chartType}
                        filterables={props.filterables}
                        dataViewType={props.dataViewType}
                    />
                );
            })}
        </div>
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
        setChartDateRange: (_date: DayRange, chartId: string) =>
            dispatch(setChartDateRange(_date, chartId)),
        editChart: (chart: any) => dispatch(editChart(chart)),
        editChartType: (chart: any) => dispatch(editChartType(chart)),
        addChart: (chart: addChartInterface) => dispatch(addChart(chart)),
        deleteChart: (uid: string) => dispatch(deleteChart(uid)),
        editChartWidth: (width: number, chartId: string) =>
            dispatch(editChartWidth(width, chartId)),
        setChartOrderOnPage: ({
            desiredOrder,
            chartId,
        }: {
            desiredOrder: number;
            chartId: string;
        }) => dispatch(setChartOrderOnPage({ desiredOrder, chartId })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
