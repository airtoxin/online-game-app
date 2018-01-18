import { Action, Dispatch } from 'redux';
import * as uuid from 'uuid';

export interface UserState {
  id: string;
  name?: string;
}

export enum ActionNames {
  CreateUser = 'user/CreateUser',
}

export interface CreateUserAction extends Action {
  type: ActionNames.CreateUser;
  name: string;
}

export type UserAction =
  | CreateUserAction;

export class ActionDispatcher {
  constructor(private dispatch: Dispatch<any>) {}

  createUser(name: string): void {
    const action: CreateUserAction = {
      type: ActionNames.CreateUser,
      name,
    };
    this.dispatch(action);
  }
}

const initialState: UserState = {
  id: uuid.v4(),
};

export default (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case ActionNames.CreateUser: {
      return { ...state, name: action.name };
    }
  }
  return state;
};
