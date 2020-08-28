import React from "react";
import { IMetric, IFilterable } from "../../types";
import { DayRange } from "react-modern-calendar-datepicker";

enum BlockTypes {
  chart,
  markdown,
  image,
  video,
}

export interface IChartBlockControls {}

export interface IMarkdownBlockControls {}

export interface IImageBlockControls {}

export interface IVideoBlockControls {}

export interface IChartComponent {
  metrics: Array<IMetric>;
  data: any;
  uid: string;
  to: DayRange["to"];
  from: DayRange["from"];
  chartType: string;
  colWidth: number;
  viewType: number;
  editMode: boolean;
  groupingKey?: string;
  groupedBy?: Array<IFilterable>;
  allowableCharts?: Array<string>;
  displayName?: string;
}

export interface IBlock<ControlsInterface, ShapeInterface> {
  blockType: BlockTypes;
  component: React.ReactNode;
  title: string;
  payload: {
    controls: ControlsInterface;
    shape: ShapeInterface;
  };
}
