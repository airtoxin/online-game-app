import User from './User';

export interface ChatMessage {
  id: string;
  createdAt: string; // Date string
  message: string;
  user: User;
}

export interface ChatState {
  messages: ChatMessage[];
}
