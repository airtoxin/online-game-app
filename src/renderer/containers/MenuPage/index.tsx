import * as React from 'react';
import {connect} from 'react-redux';
import {Form, Divider} from 'semantic-ui-react';
import CenterLayout from '../../components/CenterLayout/index';
import * as styles from './styles.cssmodules';

class MenuPage extends React.Component {
  render() {
    return (
      <CenterLayout>
        <Form className={styles.container}>
          <label>サーバーアドレス</label>
          <Form.Input
            placeholder='http://localhost:2008'
          />
          <Form.Button basic primary>接続</Form.Button>
          <Divider horizontal>又は</Divider>
          <label>サーバーホスト</label>
          <Form.Input
            placeholder='localhost'
          />
          <label>サーバーポート</label>
          <Form.Input
            value={2008}
          />
          <Form.Button basic primary>起動</Form.Button>
        </Form>
      </CenterLayout>
    );
  }
}

export default connect()(MenuPage);
