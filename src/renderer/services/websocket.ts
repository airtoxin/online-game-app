import * as io from 'socket.io-client';
import {ChatState} from '../../shared/models/ChatState';
import {Dispatch} from 'redux';

export class Websocket {
  private socket: SocketIOClient.Socket;
  private listening: boolean;

  connect(host: string, port: number): Promise<void> {
    return new Promise(resolve => {
      this.socket = io(`http://${host}:${port}`);

      this.socket.on('connect', resolve);

      this.socket.on('hello', () => console.warn('HELLO!!!!!!!!'));

      this.socket.on('update-chatState', (chatState: ChatState) => console.log(chatState));
    });
  }

  emit(eventName: string, ...args: any[]): Promise<void> {
    return new Promise(async resolve => {
      await this.waitUntilConnect();

      this.socket.emit(eventName, ...args, resolve);
    });
  }

  async setListeners(dispatch: Dispatch<any>) {
    if (this.listening) return;
    this.listening = true;

    await this.waitUntilConnect();

    this.socket.on('update-chatState', (chatState: ChatState) => {
      dispatch({
        type: 'update-chatState',
        chatState,
      });
    });
  }

  private waitUntilConnect(): Promise<void> {
    if (!this.socket) throw new Error('Socket was not initialized. Call connect method first.');

    if (this.socket.connected) return Promise.resolve();
    return new Promise(resolve => this.socket.on('connect', resolve));
  }
}

export default new Websocket();
