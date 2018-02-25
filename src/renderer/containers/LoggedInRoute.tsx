import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router';
import {Assign} from 'utility-types';
import { GlobalState } from '../modules/index';
import { UserState } from '../modules/user';
import User from '../../shared/models/User';

export interface Props {
  user: UserState;
  render: (user: User) => React.ReactNode;
}

export class LoggedInRoute extends React.PureComponent<Assign<RouteProps, Props>> {
  render() {
    const { user, render, ...otherProps } = this.props;
    if (!user.name) return (
      <Redirect to='/login' />
    );

    const u: User = {
      id: user.id,
      name: user.name,
    };

    return (
      <Route {...otherProps} render={() => render(u)} />
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(LoggedInRoute);
