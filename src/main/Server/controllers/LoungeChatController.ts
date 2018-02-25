import User from '../../../shared/models/User';
import {LoungeChatRepository} from '../repositories/LoungeChatRepository';
import {LoungeChatState} from '../../../shared/models/LoungeChatState';

const loungeChatRepository = new LoungeChatRepository();

export class LoungeChatController {
  async add(user: User, message: string): Promise<LoungeChatState> {
    await loungeChatRepository.save(user, message);
    const loungeChatState = await loungeChatRepository.listAll();

    return loungeChatState;
  }
}
