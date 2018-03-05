import { Server as HttpServer } from 'http';
import * as express from 'express';
import * as cors from 'cors';
import * as SocketIo from 'socket.io';
import {StatusController} from './controllers/StatusController';
import {LoungeChatController} from './controllers/LoungeChatController';
import User from '../../src/shared/models/User';

export class Server {
  bootUp(host: string, port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const app = express();
      const http = new HttpServer(app);
      const io = SocketIo(http);

      app.use(cors());

      // status routes
      app.get('/status', new StatusController().getStatus);
      const statusNamespace = io.of('/status');
      statusNamespace.on('connect', () => {});

      // lounge-chat routes
      const loungeChatNamespace = io.of('/lounge-chat');
      loungeChatNamespace.on('connect', async socket => {
        const controller = new LoungeChatController();

        socket.emit('update', await controller.get());
        socket.on('add', async (user: User, message: string) => {
          const loungeChatState = await controller.add(user, message);
          loungeChatNamespace.emit('update', loungeChatState);
        });
      });

      try {
        http.listen(port, host, () => {
          console.log(`running server ${host}:${port}`);
          resolve();
        });
      } catch {
        reject();
      }
    });
  }
}
