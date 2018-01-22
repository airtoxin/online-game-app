import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { GlobalState } from '../../modules/index';
import { UserState, ActionDispatcher as UserActionDispatcher } from '../../modules/user';

export interface Props {
  user: UserState;
  userActionDispatcher: UserActionDispatcher;
}

export interface FormValues {
  name: string;
}

export class LoginPage extends React.Component<Props & InjectedFormProps<FormValues, Props>> {
  render() {
    return (
      <div>
        <h1>hello {this.props.user.id}</h1>
        <form onSubmit={this.props.handleSubmit(formValues => console.log(formValues))}>
          <label>表示ユーザー名</label>
          <Field
            name='name'
            component='input'
            type='text'
            required
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<GlobalState>) => ({
  userActionDispatcher: new UserActionDispatcher(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm<{}, Props>({
    form: 'login-form',
  })(LoginPage)
);
