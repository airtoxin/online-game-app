import User from '../../../shared/models/User';

export interface ChatMessage {
  user: User;
  message: string;
}

export interface LoungeChat {
  chatMessages: ChatMessage[];
}

let loungeChat: LoungeChat = {
  chatMessages: [],
};

export class LoungeChatController {
  add = async (user: User, message: string): Promise<LoungeChat> => {
    const chatMessage: ChatMessage = { user, message };
    loungeChat.chatMessages.push(chatMessage);

    return loungeChat;
  }
}
