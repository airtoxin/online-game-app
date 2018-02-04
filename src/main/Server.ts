import { Server as HttpServer } from 'http';
import * as express from 'express';
import * as SocketIo from 'socket.io';

export default class Server {
  bootUp(host: string, port: number): Promise<void> {
    return new Promise(resolve => {
      const app = express();
      const http = new HttpServer(app);
      const io = SocketIo(http);

      app.get('/', (_, res) => {
        res.send('gameserver is running.');
      });

      io.on('connect', socket => {
        socket.emit('hello');
      });

      http.listen(port, host, () => {
        console.log(`running server ${host}:${port}`);
        resolve();
      });
    });
  }
}
