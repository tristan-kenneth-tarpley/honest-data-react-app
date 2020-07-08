import React, { useState, useRef } from "react";
import { filterable, metric, viewTypes } from "../types";
import { ButtonSecondary, ButtonTertiary } from "../styles/Buttons";
import { editchart } from "../actions/dashboardActions";
import { decamelize } from "../helpers";
import { DayRange } from "react-modern-calendar-datepicker";
import { ChartItemEditing } from "./ChartItemEditing";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";

const SidebarItemInfoView: React.FC = (props: any) => {
    return (
        <React.Fragment>
            <p>
                {props.metrics.map((metric_: metric, index: number) => {
                    return `${metric_.label}${
                        index < props.metrics.length - 1 ? " + " : ""
                    }`;
                })}
            </p>
            <span className="helper sub chart-info">
                {decamelize(props.chartType)} chart
            </span>
            {props.from && props.to && (
                <span className="helper sub chart-info">
                    {`${props.from.month}-${props.from.day}-${props.from.year} `}
                    to {`${props.to.month}-${props.to.day}-${props.to.year}`}
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

export const SidebarItem: React.FC<{
    chartType: string;
    uid: string;
    filterables: Array<filterable>;
    viewType: number;
    from: DayRange["from"];
    to: DayRange["to"];
    dataViewType: viewTypes;
    moveSidebarItem: (
        dragIndex: number,
        hoverIndex: number,
        chartUid: string
    ) => void;
    setChartDateRange: (_date: DayRange, chartId: string) => void;
    editChart: (chart: editchart) => void;
    deleteChart: (uid: string) => void;
    editChartWidth: (width: number, chartId: string) => void;
    editChartType: (chart: { chartId: string; chartType: string }) => void;
    setChartOrderOnPage: ({
        desiredOrder,
        chartId,
    }: {
        desiredOrder: number;
        chartId: string;
    }) => void;
    chartOrderOnPage: number;
    metrics: Array<metric>;
    editing?: boolean;
    chartWidth: number;
}> = (props) => {
    const [editing, toggleEditing] = useState(false);
    const [deleteConfirmation, toggleDeleteConfirmation] = useState(false);
    const [newChartWidth, setNewChartWidth] = useState(props.chartWidth);
    const [activeChartType, setActiveChartType] = useState(props.chartType);

    let filters: Array<metric> = props.metrics.map(
        (_metric: metric): metric => {
            return {
                label: decamelize(_metric.label),
                value: _metric.value,
            };
        }
    );
    const add = (ev: any) => {
        filters = ev.map((filter: metric) => ({
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

    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
        accept: "sidebarItem",
        hover(item: any, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = props.chartOrderOnPage;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            props.moveSidebarItem(dragIndex, hoverIndex, props.uid);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: "sidebarItem",
            id: props.uid,
            index: props.chartOrderOnPage,
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    // return (
    //     <div ref={ref} style={{ ...style, opacity }}>
    //         {text}
    //     </div>
    // );

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

    return (
        <div
            style={{ opacity }}
            ref={ref}
            className={`${editing ? "editing" : ""} sidebar__item`}
        >
            {!deleteConfirmation ? (
                <React.Fragment>
                    <div className="sidebar__item-info">
                        {/* <button onClick={() => alert("testing")}>
                            Click me
                        </button> */}
                        {!editing ? (
                            <SidebarItemInfoView {...props} />
                        ) : (
                            <ChartItemEditing
                                uid={props.uid}
                                from={props.from}
                                to={props.to}
                                activeChartType={activeChartType}
                                dataViewType={props.dataViewType}
                                chartWidth={props.chartWidth}
                                add={add}
                                filters={filters}
                                filterables={props.filterables}
                                setActiveChartType={setActiveChartType}
                                setChartDateRange={props.setChartDateRange}
                                setNewChartWidth={setNewChartWidth}
                                toggleEditing={() => toggleEditing(!editing)}
                                onSave={onSave}
                            />
                        )}
                    </div>
                    {!editing && (
                        <div className="sidebar__item-edit">
                            <i
                                onClick={() => toggleDeleteConfirmation(true)}
                                className="red far fa-times"
                            ></i>
                            <i
                                onClick={() => {
                                    toggleEditing(!editing);
                                }}
                                className="fad fa-edit"
                            ></i>
                        </div>
                    )}
                </React.Fragment>
            ) : (
                <DeleteConfirmation {...props} {...addtlProps} />
            )}
        </div>
    );
};
