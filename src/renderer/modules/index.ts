import {combineReducers} from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import counter, { CounterState } from './counter';
import user, { UserState } from './user';
import chatState, {ChatState} from './chatState';

export type GlobalState = {
  counter: CounterState;
  user: UserState;
  chatState: ChatState;
  routing: RouterState;
};

const rootReducer = combineReducers({
  counter,
  user,
  chatState,
  routing: routerReducer,
});
