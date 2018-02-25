import User from '../../../shared/models/User';
import {ChatSendFormValue} from './index';
import {ChatStateActionDispatcher} from '../../modules/chatState';

export class LoungePagePresenter {
  constructor(
    private chatStateActionDispatcher: ChatStateActionDispatcher
  ) {}

  async handleSubmitChatMessage(user: User, values: ChatSendFormValue): Promise<void> {
    await this.chatStateActionDispatcher.sendChatMessage(user, values.message);
  }
}
