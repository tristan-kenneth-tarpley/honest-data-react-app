import React from "react";
import { IMetric, IFilterable } from "../../types";
import { DayRange } from "react-modern-calendar-datepicker";
import IMarkdownBlockControls from "./controls/IMarkdownBlockControls";
import IChartBlockControls from "./controls/IChartBlockControls";
import IImageBlockControls from "./controls/IImageBlockControls";
import IVideoBlockControls from "./controls/IVideoBlockControls";
import IChartComponent from "./shapes/IChartComponent";

export enum BlockTypes {
  chart,
  markdown,
  image,
  video,
}

export type PossibleControlInterfaces =
  | IChartBlockControls
  | IMarkdownBlockControls
  | IImageBlockControls
  | IVideoBlockControls;

export type PossibleShapeInterfaces = IChartComponent;

export interface IBlock<ControlsInterface, ShapeInterface> {
  uid: string;
  orderOnPage: number;
  blockType: BlockTypes;
  component?: React.ReactNode;
  displayName?: string;
  viewType: number;
  editing: boolean;
  displayProperties: {
    colWidth: number;
    shouldShow: boolean;
    className: string;
  };
  payload: {
    controls?: ControlsInterface;
    properties: ShapeInterface;
  };
}
