import { createStore, applyMiddleware, Store } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from './modules';
import history from './history';

const router = routerMiddleware(history);

export default createStore(reducers, applyMiddleware(router, thunk));
