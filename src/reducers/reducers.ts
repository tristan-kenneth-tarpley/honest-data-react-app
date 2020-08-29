import { searchTypeReducer } from "./searchReducer";
import { chartReducer } from "./reactReducers/chartReducer";
import { dashboardReducer } from "./reduxReducers/dashboardReducer";

interface IAction {
  type: string;
  payload: any;
}

export type IReducer = (state: any, action: IAction) => any;

export default {
  searchTypeReducer,
  dashboardReducer,
};
