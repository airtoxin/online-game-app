import {Action} from 'redux';

export enum MenuPageActionTypes {
  BootUpServer = 'menuPage/BootUpServer',
  ConnectToServer = 'menuPage/ConnectToServer',
}

export interface BootUpServerAction extends Action {
  type: MenuPageActionTypes.BootUpServer;
}

export interface ConnectToServerAction extends Action {
  type: MenuPageActionTypes.ConnectToServer;
}

export class MenuPageActionDispatcher {
  async bootUpServer(_host: string, _port: number): Promise<void> {
  }

  async connectToServer(_address: string): Promise<void> {
  }
}
