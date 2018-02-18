import {ChatState} from '../../shared/models/ChatState';
import {Action} from 'redux';
import User from '../../shared/models/User';

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
  sendChatMessage(_user: User, _message: string) {
    return new Promise(resolve => {
      resolve();
    });
  }
}

export default (state: ChatState = initialState, action: ChatStateAction): ChatState => {
  if (action.type === ChatStateActionNames.UpdateChatState) {
    return action.chatState;
  }
  return state;
};
