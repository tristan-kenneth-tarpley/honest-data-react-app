import React from "react";

import { Grid, Row, Col } from "react-flexbox-grid";
import Toolbar from "../components/Toolbar";
import { ButtonPrimary } from "../styles/Buttons";
import {
  IChartListing,
  IEndpointsKeys,
  APIResponse,
  ViewTypes,
} from "../types";
import { ChartListing } from "./ChartListing";
import { DayRange } from "react-modern-calendar-datepicker";
import { DataViewModel } from "../apiUtils/DataViewModel";
import Loader from "./Loader";
import { sortChartKeys } from "../utils/sortChartKeys";

interface IDashboard {
  source: string;
  src: string;
  description: string;
  title: string;
  endpoints: Array<IEndpointsKeys>;
  editMode: boolean;
  from: DayRange["from"];
  to: DayRange["to"];
  toggleEditMode: () => void;
  records: APIResponse["records"];
  isLoaded: boolean;
  charts: { [key: string]: IChartListing };
  viewType: ViewTypes;
  viewTypes: any;
}

const Dashboard: React.FC<IDashboard> = (props) => {
  if (!props.isLoaded) return <Loader />;

  const { source, description, title, endpoints, src } = props;
  const sortedChartKeys = sortChartKeys(props.charts);
  return (
    <React.Fragment>
      <Grid fluid>
        <ButtonPrimary onClick={props.toggleEditMode} id="toggleEditMode">
          {props.editMode ? (
            <i className="fad fa-expand-arrows"></i>
          ) : (
            <i className="fad fa-pen"></i>
          )}
        </ButtonPrimary>
        <Toolbar
          source={source}
          description={description}
          title={title}
          endpoints={endpoints}
          src={src}
          dataViewType={props.viewType}
        />
        <Row>
          {sortedChartKeys.length > 0 ? (
            sortedChartKeys.map((_chart: any) => {
              const chart = props.charts[_chart];
              const { from, to } = chart;
              const data = new DataViewModel({
                records: props.records,
                metrics: chart.metrics,
                shrink: props.records.length > 15 ? true : false,
                from: from ? from : props.from,
                to: to ? to : props.to,
                viewType: props.viewType,
              });
              return (
                <ChartListing
                  key={_chart}
                  viewType={props.viewType}
                  metrics={chart.metrics}
                  colWidth={chart.width}
                  data={data.clean()}
                  to={chart.to ? chart.to : props.to}
                  from={chart.from ? chart.from : props.from}
                  chartType={chart.chartType}
                  uid={_chart}
                />
              );
            })
          ) : (
            <Col style={{ marginTop: "1em", textAlign: "center" }} lg={12}>
              <h5>
                Dashboard is empty. Start by adding some charts on the left!
              </h5>
            </Col>
          )}
        </Row>
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;
