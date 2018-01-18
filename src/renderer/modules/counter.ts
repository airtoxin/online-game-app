import { Action, Dispatch } from 'redux';

export interface CounterState {
  count: number;
}

export enum ActionNames {
  Increment = 'counter/Increment',
  Decrement = 'counter/Decrement',
}

export interface IncrementAction extends Action {
  type: ActionNames.Increment;
  amount: number;
}

export interface DecrementAction extends Action {
  type: ActionNames.Decrement;
  amount: number;
}

export type CounterAction =
  | IncrementAction
  | DecrementAction;

export class ActionDispatcher {
  constructor(private dispatch: Dispatch<any>) { }

  increment(amount: number): void {
    const action: IncrementAction = {
      type: ActionNames.Increment,
      amount,
    };
    this.dispatch(action);
  }

  decrement(amount: number): void {
    const action: DecrementAction = {
      type: ActionNames.Decrement,
      amount,
    };
    this.dispatch(action);
  }
}

const initialState: CounterState = {
  count: 0,
};

export default (state: CounterState = initialState, action: CounterAction): CounterState => {
  switch (action.type) {
    case ActionNames.Increment: {
      return { ...state, count: state.count + action.amount };
    }
    case ActionNames.Decrement: {
      return { ...state, count: state.count - action.amount };
    }
  }
  return state;
};
