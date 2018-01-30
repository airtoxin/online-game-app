import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
const persistStore = require('redux-persist').persistStore; // tslint:disable-line
const PersistGate = require('redux-persist/lib/integration/react').PersistGate; // tslint:disable-line
import store from './store';
import history from './history';
import Routes from './Routes';
// inject global css
import 'sanitize.css/sanitize.css';
import 'semantic-ui-css/semantic.css';
import './global.css';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app'),
);
