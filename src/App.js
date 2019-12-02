import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from 'react-redux'
import store from './store'

import './App.css';

import Index from './containers/FrontPage';
import Result from './containers/ResultPage';

class App extends React.Component {
  render = () => {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Switch>
              <Route path="/(search|images|news)/">
                <Result history={this.props.history} />
              </Route>
              <Route path="/">
                <Index history={this.props.history} />
              </Route>
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
