import {ChatState} from '../../shared/models/ChatState';
import {Action} from 'redux';
import User from '../../shared/models/User';
import websocket from '../services/websocket';
import {Messages} from '../../shared/message';

export {ChatState} from '../../shared/models/ChatState';

export enum ChatStateActionNames {
  UpdateChatState = 'chatState/UpdateChatState',
}

export interface UpdateChatStateAction extends Action {
  type: ChatStateActionNames.UpdateChatState;
  chatState: ChatState;
}

export type ChatStateAction =
  | UpdateChatStateAction;

const initialState: ChatState = {
  messages: [],
};

export class ChatStateActionDispatcher {
  sendChatMessage(user: User, message: string) {
    return new Promise(resolve => {
      websocket.emit(Messages.LOUNGE_CHAT_ADD_MESSAGE, user, message, resolve);
    });
  }
}

export default (state: ChatState = initialState, action: ChatStateAction): ChatState => {
  if (action.type === ChatStateActionNames.UpdateChatState) {
    return action.chatState;
  }
  return state;
};
