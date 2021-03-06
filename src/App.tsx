import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.css";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import DashboardContainer from "./containers/DashboardContainer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Search />
        </Route>
        <Route
          exact
          path="/dashboard/:src/:singleOrMulti"
          component={DashboardContainer}
        />
        <Route
          exact
          path="/dashboard/:src/:singleOrMulti/:endpoint"
          component={DashboardContainer}
        />
        <Route path="/">
          <Search />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
