import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  match,
} from "react-router-dom";
import './styles/App.css';
import Search from './components/Search'
import Navbar from './components/Navbar'
import DashboardContainer from './containers/DashboardContainer'

function App() {
  //let { src } = useParams();
  return (
    <Router>
      <Navbar />
      <Switch>
          <Route exact path="/">
            <Search />
          </Route>
          <Route exact path="/dashboard/:src/:singleOrMulti" component={DashboardContainer} />
          <Route exact path="/dashboard/:src/:singleOrMulti/:endpoint" component={DashboardContainer} />
      </Switch>
    </Router>
  );
}

export default App;
