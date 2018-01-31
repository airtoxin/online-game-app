import { ipcRenderer } from 'electron';
import { Action, Dispatch } from 'redux';
import { Messages } from '../../shared/message';

export interface ServerState {
  host?: string;
  port?: number;
}

export enum ActionNames {
  BootUpServer = 'server/BootUpServer',
}

export interface BootUpServerAction extends Action {
  type: ActionNames.BootUpServer;
  host: string;
  port: number;
}

export type ServerAction =
  | BootUpServerAction;

export class ActionDispatcher {
  constructor(private dispatch: Dispatch<any>) {}

  bootUpServer(host: string, port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      ipcRenderer.send(Messages.BOOT_UP_SERVER, host, port);
      ipcRenderer.on(Messages.BOOT_UP_SERVER_SUCCESS, () => {
        const action: BootUpServerAction = {
          type: ActionNames.BootUpServer,
          host,
          port,
        };
        this.dispatch(action);
        resolve();
      });
      ipcRenderer.on(Messages.BOOT_UP_SERVER_FAILED, () => {
        reject();
      });
    });
  }
}

const initialState: ServerState = {};

export default (state: ServerState = initialState, action: ServerAction): ServerState => {
  switch (action.type) {
    case ActionNames.BootUpServer: {
      return { ...state, host: action.host, port: action.port };
    }
    default: {
      return state;
    }
  }
};
