import {Dispatch} from 'redux';
import {push} from 'react-router-redux';
import {ActionDispatcher as ServerActionDispatcher} from '../../modules/server';
import websocket from '../../services/websocket';

export default class MenuPageActionDispatcher {
  constructor(
    private dispatch: Dispatch<any>,
    private serverActionDispatcher: ServerActionDispatcher,
  ) {}

  async bootUpServer(host: string, port: number) {
    await this.serverActionDispatcher.bootUpServer(host, port);
    await this.connectToServer(host, port);
    this.dispatch(push('/lounge'));
  }

  async connectToServer(host: string, port: number) {
    await websocket.connect(host, port);
    websocket.setListeners(this.dispatch);
  }
}
