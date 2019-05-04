import React, { Component } from "react";
import TriageDetailedPage from '../../features/triage/TriageDashboard/TriageDashboard'
import TriageMethod from '../../features/triage/TriageDashboard/TriageMethod'
import NavBar from "../../features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/triage-gh-pages/' component={HomePage}/>
        </Switch>

        <Route
        path="/triage-gh-pages/(.+)"
        render={() => (
          <div>
          <NavBar />
          <Container className="main">
            <Switch>
              <Route path='/triage-gh-pages/triage' component={TriageDetailedPage}/>
              <Route path='/triage-gh-pages/triage-method' component={TriageMethod}/>
            </Switch>
          </Container>
          </div>
        )} />
      </div>
    );
  }
}

export default App;
