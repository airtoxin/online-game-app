import {ChatState} from '../../shared/models/ChatState';
import {Messages} from '../../shared/message';
import {Action} from 'redux';
import User from '../../shared/models/User';
import websocket from '../services/websocket';

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

export class ChatStateActionDispatcher {
  async sendChatMessage(user: User, message: string) {
    await websocket.emit(Messages.CHAT_MESSAGE, user, message);
  }
}

export default (state: ChatState = initialState, action: ChatStateAction): ChatState => {
  if (action.type === Messages.UPDATE_CHAT_STATE) {
    return action.chatState;
  }
  return state;
};
