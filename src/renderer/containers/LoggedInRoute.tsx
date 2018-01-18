import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router';
import { GlobalState } from '../modules/index';
import { UserState } from '../modules/user';

export interface Props {
  user: UserState;
}

export class LoggedInRoute extends React.PureComponent<Props & RouteProps> {
  render() {
    const { user, ...otherProps } = this.props;
    if (!user.name) {
      return (
        <Redirect to='/login' />
      );
    }
    return (
      <Route {...otherProps} />
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(LoggedInRoute);
