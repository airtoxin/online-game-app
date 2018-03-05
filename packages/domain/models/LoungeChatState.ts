import User from './User';

export interface LoungeChatMessage {
  id: string;
  createdAt: string; // Date string
  message: string;
  user: User;
}

export interface LoungeChatState {
  messages: LoungeChatMessage[];
}
