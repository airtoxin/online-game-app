import * as React from 'react';
import { Switch, Route } from 'react-router';
import LoggedInRoute from './containers/LoggedInRoute';
import CounterPage from './containers/CounterPage';
import LoginPage from './containers/LoginPage';
import MenuPage from './containers/MenuPage';
import LoungePage from './containers/LoungePage';

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
          path='/lounge'
          exact
          render={user => (
            <LoungePage user={user} presenter={null as any}/>
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
