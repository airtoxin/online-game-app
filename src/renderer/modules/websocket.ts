import {Action, Dispatch} from 'redux';
import * as io from 'socket.io-client';

export interface WebsocketState {
  socket?: SocketIOClient.Socket;
}

export enum ActionNames {
  SetConnectionInfo = 'websocket/SetConnectionInfo',
}

export interface SetConnectionInfoAction extends Action {
  type: ActionNames.SetConnectionInfo;
  socket: SocketIOClient.Socket;
}

type WebsocketAction =
  | SetConnectionInfoAction;

export class ActionDispatcher {
  constructor(private dispatch: Dispatch<any>) {}

  setConnectionInfo(host: string, port: number): Promise<void> {
    return new Promise(resolve => {
      const socket = io(`http://${host}:${port}`);
      socket.on('connection', () => {
        const action: SetConnectionInfoAction = {
          type: ActionNames.SetConnectionInfo,
          socket,
        };

        this.dispatch(action);

        resolve();
      });
    });
  }
}

const initialState: WebsocketState = {};

export default (state: WebsocketState = initialState, action: WebsocketAction): WebsocketState => {
  switch (action.type) {
    case ActionNames.SetConnectionInfo: {
      return { socket: action.socket };
    }
    default: {
      return state;
    }
  }
};
