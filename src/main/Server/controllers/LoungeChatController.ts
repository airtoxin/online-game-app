import User from '../../../shared/models/User';
import {ChatMessage, ChatState} from '../../../shared/models/ChatState';
import * as uuid from 'uuid';

let loungeChat: ChatState = {
  messages: [],
};

export class LoungeChatController {
  async add(user: User, message: string): Promise<ChatState> {
    const chatMessage: ChatMessage = {
      id: uuid.v4(),
      createdAt: new Date().toISOString(),
      user,
      message,
    };
    loungeChat.messages.push(chatMessage);

    return loungeChat;
  }
}
