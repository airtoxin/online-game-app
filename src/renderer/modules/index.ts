import { combineReducers, AnyAction } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import counter, { CounterState } from './counter';
import user, { UserState } from './user';

export type GlobalState = {
  counter: CounterState;
  user: UserState;
  routing: RouterState;
};

export default combineReducers({
  counter,
  user,
  form,
  routing: routerReducer,
});
