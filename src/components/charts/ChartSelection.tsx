import React, { ReactNode, Dispatch, SetStateAction } from "react";
import { ViewTypes, Charts } from "../../types";
import { Helper } from "../../styles/Typography";

export const getAllowableChartTypes = (
  viewType: ViewTypes,
  setActiveChartType: (() => void) | Dispatch<SetStateAction<string>>,
  activeChartType: string
) => {
  interface IAllowableTypes {
    [key: number]: Array<{
      chart: Charts;
      displayName: string;
      component: ReactNode;
    }>;
  }

  const allowableTypes: IAllowableTypes = {
    [ViewTypes.categorized]: [
      {
        chart: Charts.pie,
        displayName: "Pie chart",
        component: (
          <ChartIcon
            key={`pie_chart-${Charts.bar}`}
            onClick={setActiveChartType}
            activeChartType={activeChartType}
            icon={<i className="fad fa-chart-pie"></i>}
            displayName="Pie Chart"
            chartType="pie"
          />
        ),
      },
      {
        chart: Charts.bar,
        displayName: "Bar chart",
        component: (
          <ChartIcon
            key={`bar_chart-${Charts.bar}`}
            onClick={setActiveChartType}
            activeChartType={activeChartType}
            icon={<i className="fad fa-chart-bar"></i>}
            displayName="Bar chart"
            chartType="bar"
          />
        ),
      },
    ],
    [ViewTypes.timeSeries]: [
      {
        chart: Charts.line,
        displayName: "Line chart",
        component: (
          <ChartIcon
            key={`line_chart-${Charts.bar}`}
            onClick={setActiveChartType}
            activeChartType={activeChartType}
            icon={<i className="fad fa-chart-line"></i>}
            displayName="Line Chart"
            chartType="line"
          />
        ),
      },
      {
        chart: Charts.bar,
        displayName: "Bar chart",
        component: (
          <ChartIcon
            key={`bar_chart-${Charts.bar}`}
            onClick={setActiveChartType}
            activeChartType={activeChartType}
            icon={<i className="fad fa-chart-bar"></i>}
            displayName="Bar chart"
            chartType="bar"
          />
        ),
      },
    ],
  };

  return allowableTypes[viewType];
};

const ChartIcon: React.FC<{
  displayName: string;
  icon: ReactNode;
  activeChartType: string;
  chartType: string;
  onClick: (chartType: string) => void;
}> = (props) => {
  return (
    <div
      onClick={() => props.onClick(props.chartType)}
      className={`chartSelector__item
            ${props.activeChartType === props.chartType ? "active" : ""}`}
    >
      {props.icon}
      <Helper>{props.displayName}</Helper>
    </div>
  );
};

export const ChartSelection: React.FC<{
  dataViewType: ViewTypes;
  setActiveChartType: (() => void) | Dispatch<SetStateAction<string>>;
  activeChartType: string;
}> = ({ dataViewType, setActiveChartType, activeChartType }) => {
  const allowedChartTypes = getAllowableChartTypes(
    dataViewType,
    setActiveChartType,
    activeChartType
  );

  return (
    <div className="chartSelection__container">
      {allowedChartTypes.map((chartType) => chartType.component)}
    </div>
  );
};
