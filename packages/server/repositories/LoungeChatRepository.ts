import {LoungeChatMessage, LoungeChatState} from '../../domain/models/LoungeChatState';
import User from '../../domain/models/User';
import * as uuid from 'uuid';

const state: LoungeChatState = {
  messages: [],
};

export class LoungeChatRepository {
  save(user: User, message: string): Promise<LoungeChatMessage> {
    const loungeChatMessage: LoungeChatMessage = {
      id: uuid.v4(),
      createdAt: new Date().toISOString(),
      user,
      message
    };
    state.messages.push(loungeChatMessage);

    return Promise.resolve(loungeChatMessage);
  }

  listAll(): Promise<LoungeChatState> {
    return Promise.resolve(state);
  }
}
