import User from '../User';
import {Socket} from './Socket';

export class AddLoungeChatMessageEmitter {
  constructor(private socket: Socket) {}

  emit(user: User, message: string, callback: Function): void {
    this.socket.emit('AddLoungeChatMessageEmitter', user, message, callback);
  }

  listen(listener: (user: User, message: string, callback: Function) => void): void {
    this.socket.on('AddLoungeChatMessageEmitter', listener);
  }
}
