import {ChatState} from '../../shared/models/ChatState';
import {Messages} from '../../shared/message';
import {Action} from 'redux';

export {ChatState} from '../../shared/models/ChatState';

export interface UpdateChatStateAction extends Action {
  type: Messages.UPDATE_CHAT_STATE;
  chatState: ChatState;
}

export type ChatStateAction =
  | UpdateChatStateAction;

const initialState: ChatState = {
  messages: [],
};

export default (state: ChatState = initialState, action: ChatStateAction): ChatState => {
  if (action.type === Messages.UPDATE_CHAT_STATE) {
    return action.chatState;
  }
  return state;
};
