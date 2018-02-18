import { Server as HttpServer } from 'http';
import * as express from 'express';
import * as cors from 'cors';
import * as SocketIo from 'socket.io';
import {StatusController} from './controllers/StatusController';

export default class Server {
  bootUp(host: string, port: number): Promise<void> {
    return new Promise(resolve => {
      const app = express();
      const http = new HttpServer(app);
      const io = SocketIo(http);

      app.use(cors());

      app.get('/', StatusController.getStatus);

      io.on('connect', socket => {
        socket.on('*', console.log);
      });

      http.listen(port, host, () => {
        console.log(`running server ${host}:${port}`);
        resolve();
      });
    });
  }
}
