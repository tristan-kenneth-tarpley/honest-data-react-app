import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import {
  hydrateDashboard,
  toggleEditMode,
  addChart,
  setDataViewType,
} from "../actions/dashboardActions";
import { fetchData } from "../services/api";
import { getFilterables } from "../apiUtils/filterables";
import Dashboard from "../components/Dashboard";
import SidebarContainer from "../containers/SidebarContainer";
import { APIResponse, IChartListing, IFilterable, ViewTypes } from "../types";
import { DayRange } from "react-modern-calendar-datepicker";

interface RouteParams {
  src: string;
  singleOrMulti: string;
  endpoint?: string | undefined;
}

interface DashboardContainer {
  data: APIResponse;
  from: DayRange;
  to: DayRange;
  editMode: () => void;
  chartListings: {
    [key: string]: IChartListing;
  };
  hydrateDashboard: (data: APIResponse | null) => APIResponse;
  toggleEditMode: (data: boolean) => void;
  addChart: (data: APIResponse["records"]) => void;
}

const mapStateToProps = (state: any) => {
  return {
    data: state.dashboardReducer.data,
    editMode: state.dashboardReducer.editMode,
    chartListings: state.dashboardReducer.charts,
    to: state.dashboardReducer.to,
    from: state.dashboardReducer.from,
    dataViewType: state.dashboardReducer.dataViewType,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    hydrateDashboard: (data: string) => dispatch(hydrateDashboard(data)),
    toggleEditMode: (data: boolean) => dispatch(toggleEditMode(data)),
    addChart: (data: any) => dispatch(addChart(data)),
    setDataViewType: (viewType: ViewTypes) =>
      dispatch(setDataViewType(viewType)),
  };
};

const DashboardContainer: React.FC = (props: any) => {
  const { hydrateDashboard, setDataViewType } = props;
  const params = useParams<RouteParams>();
  const { singleOrMulti, src, endpoint } = params;
  const { editMode } = props;
  const filterablesDefinition: Array<IFilterable> = [];
  const [filterables, updateFilterables] = useState(filterablesDefinition);

  useEffect(() => {
    (async () => {
      hydrateDashboard(null);
      const data = await fetchData(singleOrMulti, src, endpoint);
      updateFilterables(getFilterables(Object.keys(data.records[0])));
      hydrateDashboard(data);
      setDataViewType(data.viewType);
    })();
  }, [endpoint, singleOrMulti, src, hydrateDashboard, setDataViewType]);

  const data = props.data ? props.data : {};
  const DashboardProps = {
    isLoaded: data.title ? true : false,
    source: data.source,
    description: data.description,
    title: data.title,
    endpoints: data.endpoints,
    records: data.records,
    viewType: data.viewType,
    viewTypes: data.viewTypes,
  };

  return (
    <div className="dashboard">
      {props.editMode && (
        <SidebarContainer
          filterables={filterables}
          viewType={DashboardProps.viewType}
        />
      )}

      <div id="dashboard__container" className="dashboard__container">
        <Dashboard
          charts={props.chartListings}
          editMode={editMode}
          toggleEditMode={() => props.toggleEditMode(!props.editMode)}
          src={src}
          to={props.to}
          from={props.from}
          {...DashboardProps}
        />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
