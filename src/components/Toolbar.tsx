import React from "react";
import { connect } from "react-redux";
import { Listing } from "./Listing";
import { Grid, Row, Col } from "react-flexbox-grid";
import { DateRange } from "./DateRange";
import { Helper } from "../styles/Typography";
import { IDate, ViewTypes } from "../types";
import { setDateRange } from "../actions/dashboardActions";
import { DayRange } from "react-modern-calendar-datepicker";

interface endpoint {
  key: string;
  active: boolean;
}

const ToolbarHeader: React.FC<{
  title: string;
  description: string;
  source: string;
}> = (props) => {
  return (
    <div className="info">
      <h5>{props.title}</h5>
      <p>{props.description}</p>
      <a target="__blank" href={props.source}>
        source
      </a>
    </div>
  );
};

const RelatedData: React.FC<{
  endpoints: Array<endpoint>;
  src: string;
}> = ({ endpoints, src }) => {
  return (
    <div className="related-data__container">
      <Helper>Related data:</Helper>
      <div className="sources">
        {endpoints.map((_endpoint: endpoint, index: number) => (
          <Listing
            key={index}
            uid={index}
            endpoint={_endpoint.key}
            value={_endpoint.key}
            src={src}
            active={_endpoint.active}
            decamelize={true}
          />
        ))}
      </div>
    </div>
  );
};

interface toolbar {
  title: string;
  filterables?: Array<any>;
  source: string;
  description: string;
  endpoints: Array<endpoint>;
  src: string;
  from: IDate;
  to: IDate;
  dataViewType: ViewTypes;
  setDateRange: (_date?: any) => void;
}

const Toolbar: React.FC<toolbar> = (props) => {
  return (
    <div className="dashboard__toolbar">
      <Grid fluid>
        <Row>
          <Col lg={12}>
            <RelatedData src={props.src} endpoints={props.endpoints} />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={6} sm={12}>
            <ToolbarHeader
              title={props.title}
              description={props.description}
              source={props.source}
            />
          </Col>
          {props.dataViewType === ViewTypes.timeSeries && (
            <Col lg={6} md={6} sm={12}>
              <br />
              <Helper>Default date range:</Helper>
              <DateRange
                from={props.from}
                to={props.to}
                setDateRange={props.setDateRange}
                padding={true}
              />
            </Col>
          )}
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    from: state.dashboardReducer.from,
    to: state.dashboardReducer.to,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setDateRange: (_date: DayRange) => dispatch(setDateRange(_date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
