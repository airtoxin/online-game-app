import * as React from 'react';
import * as SocketIO from 'socket.io-client';

export interface Props {
  host: string;
  port: number;
  path: string;
  render: (socket: SocketIOClient.Socket) => React.ReactNode;
}

export interface State {
  connect: boolean;
}

export class WithSocket extends React.Component<Props, State> {
  private socket: SocketIOClient.Socket;
  constructor(props: Props) {
    super(props);
    this.state = { connect: false };

    this.socket = SocketIO(`http://${props.host}:${props.port}/${props.path}`);
    this.socket.on('connect', () => this.setState({ connect: true }));
    this.socket.on('disconnect', () => this.setState({ connect: false }));
  }

  render() {
    if (!this.state.connect) return (<h1>connecting...</h1>);

    return this.props.render(this.socket);
  }
}
