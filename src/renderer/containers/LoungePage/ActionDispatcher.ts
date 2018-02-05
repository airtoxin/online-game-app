import websocket from '../../services/websocket';
import User from '../../../shared/models/User';

export default class LoungePageActionDispatcher {
  constructor(/* private dispatch: Dispatch<any> */) {}

  async sendChatMessage(user: User, message: string) {
    await websocket.emit('message', user, message);
  }
}
