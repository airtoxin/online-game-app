import User from '../../domain/models/User';
import {LoungeChatRepository} from '../repositories/LoungeChatRepository';
import {LoungeChatState} from '../../domain/models/LoungeChatState';

const loungeChatRepository = new LoungeChatRepository();

export class LoungeChatController {
  async get(): Promise<LoungeChatState> {
    return await loungeChatRepository.listAll();
  }

  async add(user: User, message: string): Promise<LoungeChatState> {
    await loungeChatRepository.save(user, message);
    return await loungeChatRepository.listAll();
  }
}
