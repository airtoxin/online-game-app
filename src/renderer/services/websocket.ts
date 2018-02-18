import * as io from 'socket.io-client';
import {UpdateLoungeChatMessageEmitter} from '../../shared/models/emitters/UpdateLoungeChatMessageEmitter';

export class Websocket {
  private instance
  private constructor(
    private socket: SocketIOClient.Socket,
  ) {}

  connect(address: string): Promise<Websocket> {
    return new Promise(resolve => {
      this.socket = io(address);

      this.socket.on('connect', () => resolve(new Websocket(this.socket)));
    });
  }

  async emit(eventName: string, ...args: any[]): Promise<void> {
    await this.waitUntilConnect();

    this.socket.emit(eventName, ...args);
  }

  async on(eventName: string, listener: Function): Promise<void> {
    await this.waitUntilConnect();

    this.socket.on(eventName, listener);
  }

  async once(eventName: string, listener: Function): Promise<void> {
    await this.waitUntilConnect();

    this.socket.once(eventName, listener);
  }

  private waitUntilConnect(): Promise<void> {
    if (!this.socket) throw new Error('Socket was not initialized. Call connect method first.');

    if (this.socket.connected) return Promise.resolve();
    return new Promise(resolve => this.socket.on('connect', resolve));
  }
}

export default new Websocket();
