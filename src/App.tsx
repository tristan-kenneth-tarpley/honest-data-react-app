import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './styles/App.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Text} from './styles/Typography'
import {ButtonPrimary, ButtonSecondary, ButtonTertiary} from './styles/Buttons'

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/">
            <Grid fluid>
              <Row>
                <Col lg={12}>
                  <h1>Hello world</h1>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <Text size="lg" len="short">
                    Hey there
                  </Text>
                </Col>
                <Col lg={4}>
                  <ButtonPrimary id="test">Test button</ButtonPrimary>
                </Col>
                <Col lg={4}><p>Hello world</p></Col>
              </Row>
            </Grid>
            
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
