import { Server as HttpServer } from 'http';
import * as express from 'express';
import * as SocketIo from 'socket.io';
import User from '../shared/models/User';
import {ChatMessage, ChatState} from '../shared/models/ChatState';

const chatState: ChatState = {
  messages: [],
};

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

        socket.on('message', (user: User, message: string, callback: Function) => {
          const chatMessage: ChatMessage = {
            id: `${Math.random()}`,
            user,
            message,
            createdAt: new Date().toISOString(),
          };
          chatState.messages = chatState.messages.concat([chatMessage]);

          io.sockets.emit('update-chatState', chatState);
          callback();
        });
      });

      http.listen(port, host, () => {
        console.log(`running server ${host}:${port}`);
        resolve();
      });
    });
  }
}
