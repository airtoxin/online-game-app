import {ChatState} from '../../shared/models/ChatState';

export {ChatState} from '../../shared/models/ChatState';

const initialState: ChatState = {
  messages: [],
};

export default (state: ChatState = initialState, action: any): ChatState => {
  if (action.type === 'update-chatState') {
    return action.chatState as ChatState;
  }
  return state;
};
