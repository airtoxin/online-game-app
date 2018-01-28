import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { GlobalState } from '../../modules/index';
import { UserState, ActionDispatcher as UserActionDispatcher } from '../../modules/user';
import { FormEvent, SyntheticEvent } from 'react';
import * as styles from './styles.cssmodules';

export interface Props {
  user: UserState;
  userActionDispatcher: UserActionDispatcher;
}

export interface State {
  name: string;
}

export class LoginPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  render() {
    return (
      <div className={styles.red}>
        <h1>hello {this.props.user.id}</h1>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <label>表示ユーザー名</label>
          <Form.Input type='text' value={this.state.name} onChange={this.handleChange.bind(this)}/>

          <Form.Button onSubmit={this.handleSubmit.bind(this)}>OK</Form.Button>
        </Form>
      </div>
    );
  }

  handleChange(event: SyntheticEvent<HTMLInputElement>) {
    this.setState({
      name: event.currentTarget.value,
    });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!this.state.name) return;
    console.log(this.state);
  }
}

const mapStateToProps = (state: GlobalState) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<GlobalState>) => ({
  userActionDispatcher: new UserActionDispatcher(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
