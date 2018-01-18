import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { GlobalState } from '../../modules/index';
import { ActionDispatcher } from '../../modules/counter';

export interface Props {
  count: number;
  dispatchers: ActionDispatcher;
}

export class CounterPage extends React.Component<Props> {
  render() {
    return (
      <div>
        <h1>count: {this.props.count}</h1>
        <button onClick={() => this.props.dispatchers.increment(1)}>increment +1</button>
        <button onClick={() => this.props.dispatchers.decrement(1)}>decrement -1</button>
      </div>
    );
  }
}

export default connect(
  (state: GlobalState) => ({ count: state.counter.count }),
  (dispatch: Dispatch<any>) => ({ dispatchers: new ActionDispatcher(dispatch) })
)(CounterPage);
