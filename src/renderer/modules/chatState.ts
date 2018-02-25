import {LoungeChatState} from '../../shared/models/LoungeChatState';
import {Action} from 'redux';
import User from '../../shared/models/User';

export {LoungeChatState} from '../../shared/models/LoungeChatState';

export enum ChatStateActionNames {
  UpdateChatState = 'chatState/UpdateChatState',
}

export interface UpdateChatStateAction extends Action {
  type: ChatStateActionNames.UpdateChatState;
  chatState: LoungeChatState;
}

export type ChatStateAction =
  | UpdateChatStateAction;

const initialState: LoungeChatState = {
  messages: [],
};

export class ChatStateActionDispatcher {
  sendChatMessage(_user: User, _message: string) {
    return new Promise(resolve => {
      resolve();
    });
  }
}

export default (state: LoungeChatState = initialState, action: ChatStateAction): LoungeChatState => {
  if (action.type === ChatStateActionNames.UpdateChatState) {
    return action.chatState;
  }
  return state;
};
