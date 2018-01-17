import { Action } from 'redux';

export interface CounterState {
  count: number;
}

export enum ActionNames {
  Increment = 'counter/increment',
  Decrement = 'counter/decrement',
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
