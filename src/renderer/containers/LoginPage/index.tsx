import * as React from 'react';
import { connect } from 'react-redux';
import { GlobalState } from '../../modules/index';
import { UserState } from '../../modules/user';

export interface Props {
  user: UserState;
}

export class LoginPage extends React.Component<Props> {
  render() {
    return (
      <h1>hello {this.props.user.id}</h1>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(LoginPage);
