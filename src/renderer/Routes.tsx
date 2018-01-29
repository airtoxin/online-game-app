import * as React from 'react';
import { Switch, Route } from 'react-router';
import LoggedInRoute from './containers/LoggedInRoute';
import CounterPage from './containers/CounterPage';
import LoginPage from './containers/LoginPage';
import MenuPage from './containers/MenuPage';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path='/login'
          exact
          render={() => (
            <LoginPage />
          )}
        />
        <LoggedInRoute
          path='/'
          exact
          render={() => (
            <MenuPage />
          )}
        />
        <LoggedInRoute
          path='/*'
          exact
          render={() => (
            <CounterPage />
          )}
        />
      </Switch>
    );
  }
}
