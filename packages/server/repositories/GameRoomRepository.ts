import {GameRoom} from '../../domain/models/GameRoom';
import User from '../../domain/models/User';
import * as uuid from 'uuid';
import * as lodash from 'lodash';

export type GameRoomState = GameRoom[];

let state: GameRoomState = [];

export class GameRoomRepository {
  add(name: string, owner: User): Promise<GameRoom> {
    const gameRoom: GameRoom = {
      id: uuid.v4(),
      name,
      owner,
      players: [owner],
    };
    state.push(gameRoom);
    return Promise.resolve(gameRoom);
  }

  listAll(): Promise<GameRoomState> {
    return Promise.resolve(state);
  }

  remove(id: string): Promise<void> {
    state = lodash.remove(state, gameRoom => gameRoom.id === id);
    return Promise.resolve();
  }

  addPlayer(gameRoomId: string, player: User): Promise<GameRoom> {
    let gameRoom: GameRoom | null = null;
    state = state.map(gr => {
      if (gr.id !== gameRoomId) return gr;
      gameRoom = {
        ...gr,
        players: [
          ...gr.players,
          player,
        ]
      };
      return gameRoom;
    });

    if (!gameRoom) throw new Error(`Could not find matched game room (id: ${gameRoomId}`);
    return Promise.resolve(gameRoom);
  }
}
