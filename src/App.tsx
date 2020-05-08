import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './styles/App.css';
import Search from './components/Search'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
          <Route exact path="/">
            <Search></Search>
          </Route>
      </Switch>
    </Router>
  );
}

let url;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  url = 'http://127.0.0.1:5000/'
} else {
  url = 'https://api.honestdata.world/'
}

export default App;
