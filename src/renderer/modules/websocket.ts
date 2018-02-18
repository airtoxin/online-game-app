import {StatusRepository} from '../repositories/StatusRepository';
import {Action, Dispatch} from 'redux';

export interface WebsocketState {
  host?: string;
  port?: number;
}

const initialState: WebsocketState = {};

export enum WebsocketActionNames {
  SetConnectionInfo = 'websocket/SetConnectionInfo',
}

export interface WebsocketSetConnectionInfoAction extends Action {
  type: WebsocketActionNames.SetConnectionInfo;
  host: string;
  port: number;
}

export type WebsocketAction =
  | WebsocketSetConnectionInfoAction;

export class WebsocketActionDispatcher {
  constructor(private dispatch: Dispatch<any>) {}

  async connect(host: string, port: number): Promise<void> {
    await new StatusRepository().testConnectivity(host, port);

    const action: WebsocketSetConnectionInfoAction = {
      type: WebsocketActionNames.SetConnectionInfo,
      host,
      port,
    };
    this.dispatch(action);
  }
}

export const websocketReducer = (state: WebsocketState = initialState, action: WebsocketAction): WebsocketState => {
  switch (action.type) {
    case WebsocketActionNames.SetConnectionInfo: return {
      ...state,
      host: action.host,
      port: action.port,
    };
    default: return state;
  }
};
