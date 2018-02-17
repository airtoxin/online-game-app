import {ChatMessage, ChatState} from '../../../shared/models/ChatState';
import User from '../../../shared/models/User';
import {AddLoungeChatMessageEmitter} from '../../../shared/models/emitters/AddLoungeChatMessageEmitter';
import {UpdateLoungeChatMessageEmitter} from '../../../shared/models/emitters/UpdateLoungeChatMessageEmitter';

// TODO: state management
let chatState: ChatState = {
  messages: [],
};

type Emitters =
  | AddLoungeChatMessageEmitter
  | UpdateLoungeChatMessageEmitter;

export class LoungeChatController {
  constructor(
    private socket: SocketIO.Socket,
    private sockets: SocketIO.Namespace
  ) {}

  accept(emitter: Emitters): this {
    if (emitter instanceof AddLoungeChatMessageEmitter) return this.acceptAddLoungeChatMessageEvent(emitter);
    if (emitter instanceof UpdateLoungeChatMessageEmitter) return this.acceptUpdateLoungeChatMessageEvent(emitter);
    return null as never;
  }

  private acceptAddLoungeChatMessageEvent(emitter: AddLoungeChatMessageEmitter): this {
    emitter.listen((user: User, message: string, callback: Function) => {
      const chatMessage: ChatMessage = {
        id: `${Math.random()}`,
        user,
        message,
        createdAt: new Date().toISOString(),
      };
      chatState.messages = [chatMessage].concat(chatState.messages);

      new UpdateLoungeChatMessageEmitter(this.socket).emit(this.sockets, chatState);
      callback();
    });

    return this;
  }

  private acceptUpdateLoungeChatMessageEvent(emitter: UpdateLoungeChatMessageEmitter): this {
    emitter.listen(cs => {
      chatState = cs;
    });
    return this;
  }
}
