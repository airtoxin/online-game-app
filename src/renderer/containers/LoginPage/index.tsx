import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Form, Button} from 'semantic-ui-react';
import {GlobalState} from '../../modules/index';
import {UserState, ActionDispatcher as UserActionDispatcher} from '../../modules/user';
import CenterLayout from '../../components/CenterLayout';
import * as styles from './styles.cssmodules';
import {FormikProps, withFormik} from 'formik';

export interface Props {
  user: UserState;
  userActionDispatcher: UserActionDispatcher;
  gotoRoot: () => any;
}

export interface FormValues {
  name: string;
}

const FormComponent = (props: Props & FormikProps<FormValues>) => {
  const {user, values, handleChange, handleSubmit} = props;

  return (
    <Form className={styles.formContainer} onSubmit={handleSubmit}>
      <Form.Field>
        <label>ログインID: {user.id}</label>
      </Form.Field>
      <Form.Field>
        <label>表示名</label>
        <Form.Input name='name' value={values.name} onChange={handleChange}/>
      </Form.Field>
      <Button basic primary type='submit'>ログイン</Button>
    </Form>
  );
};

const FormikForm = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({name: ''}),
  handleSubmit: (values, {props}) => {
    props.userActionDispatcher.createUser(values.name);
    props.gotoRoot();
  }
})(FormComponent);

export class LoginPage extends React.Component<Props> {
  render() {
    return (
      <CenterLayout>
        <FormikForm {...this.props} />
      </CenterLayout>
    );
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
