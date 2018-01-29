import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Form, Button, InputOnChangeData} from 'semantic-ui-react';
import {GlobalState} from '../../modules/index';
import {UserState, ActionDispatcher as UserActionDispatcher} from '../../modules/user';
import {FormEvent, SyntheticEvent} from 'react';
import CenterLayout from '../../components/CenterLayout';
import * as styles from './styles.cssmodules';

export interface Props {
  user: UserState;
  userActionDispatcher: UserActionDispatcher;
  gotoRoot: () => any;
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
      <CenterLayout>
        <Form className={styles.formContainer} onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>ログインID: {this.props.user.id}</label>
          </Form.Field>
          <Form.Field>
            <label>表示名</label>
            <Form.Input value={this.state.name} onChange={this.handleChange}/>
          </Form.Field>
          <Button basic primary type='submit' {...this.getButtonState()}>ログイン</Button>
        </Form>
      </CenterLayout>
    );
  }

  getButtonState(): {} {
    if (this.state.name) return {};
    else return {
      disabled: true,
    };
  }

  handleChange = (_: SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
    this.setState({
      name: data.value,
    });
  }

  handleSubmit = (event: FormEvent<HTMLElement>): void => {
    event.preventDefault();
    this.props.userActionDispatcher.createUser(this.state.name);
    this.props.gotoRoot();
  }
}

const mapStateToProps = (state: GlobalState) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<GlobalState>) => ({
  userActionDispatcher: new UserActionDispatcher(dispatch),
  gotoRoot: () => dispatch(push('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
