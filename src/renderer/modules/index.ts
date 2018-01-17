import { combineReducers, AnyAction } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import counter, { CounterState } from './counter';

export type GlobalState = {
  counter: CounterState;
  routing: RouterState;
};

export default combineReducers({
  counter,
  routing: routerReducer,
});
