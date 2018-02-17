import Namespace = SocketIO.Namespace;
import {ChatState} from '../ChatState';
import {Socket} from './Socket';

export class UpdateLoungeChatMessageEmitter {
  constructor(private socket: Socket) {}

  emit(sockets: Namespace, chatState: ChatState): void {
    sockets.emit('UpdateLoungeChatMessageEmitter', chatState);
  }

  listen(listener: (chatState: ChatState) => void): void {
    this.socket.on('UpdateLoungeChatMessageEmitter', listener);
  }
}
