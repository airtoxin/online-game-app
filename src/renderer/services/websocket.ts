import * as io from 'socket.io-client';
import {Dispatch} from 'redux';
import {Messages} from '../../shared/message';
import {UpdateLoungeChatMessageEmitter} from '../../shared/models/emitters/UpdateLoungeChatMessageEmitter';

export class Websocket {
  public socket: SocketIOClient.Socket;
  private listening: boolean;

  connect(address: string): Promise<void> {
    return new Promise(resolve => {
      this.socket = io(address);

      this.socket.on('connect', resolve);

      new UpdateLoungeChatMessageEmitter(this.socket).listen(chatState => console.log(chatState));
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

    new UpdateLoungeChatMessageEmitter(this.socket).listen(chatState => {
      dispatch({
        type: Messages.UPDATE_CHAT_STATE,
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
