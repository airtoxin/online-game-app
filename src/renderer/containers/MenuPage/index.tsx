import * as React from 'react';
import {connect} from 'react-redux';
import {Header, Form, Divider} from 'semantic-ui-react';
import {withFormik} from 'formik';
import CenterLayout from '../../components/CenterLayout/index';
import * as styles from './styles.cssmodules';
import {Dispatch} from 'redux';
import {MenuPagePresenter} from './presenter';
import {WebsocketActionDispatcher} from '../../modules/websocket';
import {ServerActionDispatcher} from '../../modules/server';

export interface Props {
  presenter: MenuPagePresenter;
}

export interface FormValues {
  host: string;
  port: number;
}

const ConnectionFormArea = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({ host: 'localhost', port: 2008 }),
  handleSubmit: (values, {props}) => {
    props.presenter.connectToServer(values.host, values.port);
  },
})(({
  values,
  handleChange,
  handleSubmit,
}) => (
  <Form className={styles.container} onSubmit={handleSubmit}>
    <Header size='large'>サーバーに接続する</Header>
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
    <Form.Button type='submit' basic primary>接続</Form.Button>
  </Form>
));

const BootingUpFormArea = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({host: 'localhost', port: 2008}),
  handleSubmit: (values, { props }) => {
    props.presenter.bootUpServer(values.host, values.port);
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
  presenter: new MenuPagePresenter(
    new WebsocketActionDispatcher(dispatch),
    new ServerActionDispatcher(dispatch),
  ),
});

export default connect(null, mapDispatchToProps)(MenuPage);
