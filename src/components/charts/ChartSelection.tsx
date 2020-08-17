import React, { ReactNode, Dispatch, SetStateAction } from "react";
import { ViewTypes, Charts } from "../../types";
import { Helper } from "../../styles/Typography";

export const getAllowableChartTypes = (
  viewType: ViewTypes,
  setActiveChartType?: (() => void) | Dispatch<SetStateAction<string>>,
  activeChartType?: string
) => {
  interface IAllowableTypes {
    [key: number]: Array<{
      chart: Charts;
      name: string;
      displayName: string;
      component: ReactNode;
    }>;
  }

  const displayMode = !setActiveChartType ? false : true;

  const allowableTypes: IAllowableTypes = {
    [ViewTypes.categorized]: [
      {
        chart: Charts.pie,
        name: "pie",
        displayName: "Pie chart",
        component: displayMode ? (
          <ChartIcon
            key={`pie_chart-${Charts.bar}`}
            onClick={setActiveChartType!}
            activeChartType={activeChartType!}
            icon={<i className="fad fa-chart-pie"></i>}
            displayName="Pie Chart"
            chartType="pie"
          />
        ) : null,
      },
      {
        chart: Charts.bar,
        name: "bar",
        displayName: "Bar chart",
        component: displayMode ? (
          <ChartIcon
            key={`bar_chart-${Charts.bar}`}
            onClick={setActiveChartType!}
            activeChartType={activeChartType!}
            icon={<i className="fad fa-chart-bar"></i>}
            displayName="Bar chart"
            chartType="bar"
          />
        ) : null,
      },
    ],
    [ViewTypes.timeSeries]: [
      {
        chart: Charts.line,
        name: "line",
        displayName: "Line chart",
        component: displayMode ? (
          <ChartIcon
            key={`line_chart-${Charts.bar}`}
            onClick={setActiveChartType!}
            activeChartType={activeChartType!}
            icon={<i className="fad fa-chart-line"></i>}
            displayName="Line Chart"
            chartType="line"
          />
        ) : null,
      },
      {
        chart: Charts.bar,
        name: "line",
        displayName: "Bar chart",
        component: displayMode ? (
          <ChartIcon
            key={`bar_chart-${Charts.bar}`}
            onClick={setActiveChartType!}
            activeChartType={activeChartType!}
            icon={<i className="fad fa-chart-bar"></i>}
            displayName="Bar chart"
            chartType="bar"
          />
        ) : null,
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
  console.log(activeChartType);

  return (
    <div className="chartSelection__container">
      {allowedChartTypes.map((chartType) => chartType.component)}
    </div>
  );
};
