import {combineReducers} from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import counter, { CounterState } from './counter';
import user, { UserState } from './user';
import chatState, {LoungeChatState} from './chatState';
import {websocketReducer, WebsocketState} from './websocket';

export type GlobalState = {
  counter: CounterState;
  user: UserState;
  chatState: LoungeChatState;
  websocket: WebsocketState;
  routing: RouterState;
};

const rootReducer = combineReducers({
  counter,
  user,
  chatState,
  websocket: websocketReducer,
  routing: routerReducer,
});

export default rootReducer;
