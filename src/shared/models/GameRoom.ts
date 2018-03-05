import User from './User';

export interface GameRoom {
  id: string;
  name: string;
  owner: User;
  players: User[];
}
