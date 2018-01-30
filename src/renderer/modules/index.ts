import {combineReducers} from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import counter, { CounterState } from './counter';
import user, { UserState } from './user';
const persistReducer = require('redux-persist').persistReducer; // tslint:disable-line
const storage = require('redux-persist/lib/storage').default; // tslint:disable-line

export type GlobalState = {
  counter: CounterState;
  user: UserState;
  routing: RouterState;
};

const rootReducer = combineReducers({
  counter,
  user,
  routing: routerReducer,
});

export default persistReducer({ key: 'root', storage }, rootReducer);
