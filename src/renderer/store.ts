import {createStore, applyMiddleware, compose, Store} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import * as PouchDB from 'pouchdb';
import reducers, {GlobalState} from './modules';
import history from './history';

setTimeout(() => {
  const db = new PouchDB('http://localhost:2008/db/mydb');
  db.get('hoge').then(console.log).catch(console.error);
}, 1000 * 20);

const router = routerMiddleware(history);

const enhancer = compose(
  applyMiddleware(router, thunk),
  window['devToolsExtension'] ? window['devToolsExtension']() : () => {
  },
);

const store = createStore(reducers, enhancer) as Store<GlobalState>;

export default store;
