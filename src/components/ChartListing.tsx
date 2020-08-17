import React, { ReactElement } from "react";
import { Col } from "react-flexbox-grid";
import Card from "./Card";
import { IMetric, IFilterable } from "../types";
import { LINE_CHART, PIE_CHART, BAR_CHART } from "./charts/Charts";
import { DayRange } from "react-modern-calendar-datepicker";
import styled from "styled-components/macro";
import { Text } from "../styles/Typography";
import ReactTooltip from "react-tooltip";
import Styles from "../styles/Styles";

const InvalidChartType = styled.div`
  display: flex;
  align-items: center;
  & .tooltipCover {
    cursor: pointer;
    width: 1.7rem;
    height: 1.7rem;
    display: flex;
    background: linear-gradient(115.8deg, #6e30f2 0%, #86e2ff 100%);
    color: white;
    font-weight: 700;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    box-shadow: ${Styles.boxShadow};
    margin-left: 1rem;
  }
`;
interface IChartComponent {
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
}
export const ChartListing: React.FC<IChartComponent> = (props) => {
  const dataKey = props.metrics.filter((m) => m.value !== "date")[0].value;
  const chartTable: {
    [key: string]: ReactElement;
  } = {
    line: <LINE_CHART uid={props.uid} data={props.data} />,
    bar: <BAR_CHART uid={props.uid} data={props.data} />,
    pie: (
      <PIE_CHART
        uid={props.uid}
        data={props.data}
        dataKey={dataKey}
        groupingKey={props?.groupingKey}
        groupedBy={props.groupedBy ? props.groupedBy : []}
      />
    ),
  };

  const shouldShow = props.allowableCharts?.includes(props.chartType);

  return (
    <Col
      style={!props.editMode && !shouldShow ? { display: "none" } : undefined}
      className="parent"
      lg={props.colWidth}
      md={props.colWidth}
      sm={12}
    >
      <Card>
        <h5>
          {props.metrics.map((metric_: IMetric, index: number) => {
            return `${metric_.label}${
              index < props.metrics.length - 1 ? ", " : ""
            }`;
          })}{" "}
          {props.from && props.to && (
            <span className="helper sub chart-info">
              ({`${props.from.month}-${props.from.day}-${props.from.year} `}
              to {`${props.to.month}-${props.to.day}-${props.to.year}`})
            </span>
          )}
        </h5>

        {shouldShow ? (
          <React.Fragment>{chartTable[props.chartType]}</React.Fragment>
        ) : (
          <InvalidChartType>
            <Text size="lg" len="short">
              Chart not available
            </Text>

            <div className="tooltipCover" data-tip data-for="chartNa">
              ?
            </div>
            <ReactTooltip id="chartNa" place="top" effect="solid">
              <Text style={{ color: "white" }} size="sm" len="short">
                A {props.chartType} chart type doesn't make sense with this type
                of data. Some data is meant to be shown linearly while others
                are better shown as a "snapshot in time."
                <br />
                This message only shows up in edit mode!
              </Text>
            </ReactTooltip>
          </InvalidChartType>
        )}
      </Card>
    </Col>
  );
};
