import * as React from 'react';
import {connect} from 'react-redux';
import {Header, Form, Divider} from 'semantic-ui-react';
import {withFormik} from 'formik';
import CenterLayout from '../../components/CenterLayout/index';
import {ActionDispatcher as ServerActionDispatcher} from '../../modules/server';
import ActionDispatcher from './ActionDispatcher';
import * as styles from './styles.cssmodules';
import {Dispatch} from 'redux';

export interface Props {
  actionDispatcher: ActionDispatcher;
}

export interface ConnectionFormValues {
  address: string;
}

export interface BootingUpFormValues {
  host: string;
  port: number;
}

const ConnectionFormArea = withFormik<Props, ConnectionFormValues>({
  mapPropsToValues: () => ({address: 'http://localhost:2008'}),
  handleSubmit: values => {
    console.log(values);
  },
})(({
  values,
  handleChange,
  handleSubmit,
}) => (
  <Form className={styles.container} onSubmit={handleSubmit}>
    <Header size='large'>サーバーに接続する</Header>
    <label>サーバーアドレス</label>
    <Form.Input
      name='address'
      placeholder='http://localhost:2008'
      value={values.address}
      onChange={handleChange}
    />
    <Form.Button type='submit' basic primary>接続</Form.Button>
  </Form>
));

const BootingUpFormArea = withFormik<Props, BootingUpFormValues>({
  mapPropsToValues: () => ({host: 'localhost', port: 2008}),
  handleSubmit: (values, { props }) => {
    props.actionDispatcher.bootUpServer(values.host, values.port);
  },
})(({
  values,
  handleChange,
  handleSubmit,
}) => (
  <Form onSubmit={handleSubmit}>
    <Header size='large'>サーバーを起動する</Header>
    <label>サーバーホスト</label>
    <Form.Input
      name='host'
      placeholder='localhost'
      value={values.host}
      onChange={handleChange}
    />
    <label>サーバーポート</label>
    <Form.Input
      name='port'
      type='number'
      placeholder={2008}
      value={values.port}
      onChange={handleChange}
    />
    <Form.Button type='submit' basic primary>起動</Form.Button>
  </Form>
));

class MenuPage extends React.Component<Props> {
  render() {
    return (
      <CenterLayout>
        <div className={styles.container}>
          <ConnectionFormArea {...this.props}/>
          <Divider horizontal className={styles.divider}>Or</Divider>
          <BootingUpFormArea {...this.props}/>
        </div>
      </CenterLayout>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actionDispatcher: new ActionDispatcher(
    dispatch,
    new ServerActionDispatcher(dispatch),
  ),
});

export default connect(null, mapDispatchToProps)(MenuPage);
