import * as io from 'socket.io-client';

export class Websocket {
  private socket: SocketIOClient.Socket | null = null;

  connect(host: string, port: number): Promise<void> {
    return new Promise(resolve => {
      this.socket = io(`http://${host}:${port}`);

      this.socket.on('connect', resolve);

      this.socket.on('hello', () => console.warn('HELLO!!!!!!!!'));
    });
  }
}

export default new Websocket();
