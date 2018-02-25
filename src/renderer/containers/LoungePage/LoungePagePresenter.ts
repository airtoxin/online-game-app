import User from '../../../shared/models/User';
import {ChatSendFormValue} from './index';

export class LoungePagePresenter {
  constructor(
    private loungeChatSocket: SocketIOClient.Socket
  ) {}

  async handleSubmitChatMessage(user: User, values: ChatSendFormValue): Promise<void> {
    this.loungeChatSocket.emit('add', user, values.message);
  }
}
