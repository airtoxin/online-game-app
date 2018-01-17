import * as React from 'react';
import { Switch, Route } from 'react-router';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path='/login'
          exact
          render={() => (
            <h1>login!</h1>
          )}
        />
        <Route
          path='/*'
          exact
          render={() => (
            <h1>others!</h1>
          )}
        />
      </Switch>
    );
  }
}
