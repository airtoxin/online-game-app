import * as React from 'react';
import * as SocketIO from 'socket.io-client';

export interface Props<T> {
  host: string;
  port: number;
  path: string;
  initialData: T;
  render: (socket: SocketIOClient.Socket, data: T) => React.ReactNode;
}

export interface State<T> {
  connect: boolean;
  data: T;
}

export class WithSocket<T> extends React.Component<Props<T>, State<T>> {
  private socket: SocketIOClient.Socket;
  constructor(props: Props<T>) {
    super(props);
    this.state = {
      connect: false,
      data: props.initialData
    };

    this.socket = SocketIO(`http://${props.host}:${props.port}/${props.path}`);
    this.socket.on('connect', () => this.setState({ connect: true }));
    this.socket.on('disconnect', () => this.setState({ connect: false }));
    this.socket.on('update', (data: T) => this.setState({ data }));
  }

  render() {
    if (!this.state.connect) return (<h1>connecting...</h1>);

    return this.props.render(this.socket, this.state.data);
  }
}
