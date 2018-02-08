import { app } from 'electron';
import { ensureDirSync } from 'fs-extra';
import * as path from 'path';
import { Server as HttpServer } from 'http';
import * as express from 'express';
import * as cors from 'cors';
import * as SocketIo from 'socket.io';
import * as PouchDb from 'pouchdb';
import User from '../shared/models/User';
import {ChatMessage, ChatState} from '../shared/models/ChatState';
import Socket = SocketIO.Socket;
import {Messages} from '../shared/message';

const pouchDir = path.join(app.getPath('userData'), 'pouchdb');

ensureDirSync(pouchDir);

const DB = PouchDb.defaults({ prefix: path.join(pouchDir, 'db') } as any);

// TODO: state management
const chatState: ChatState = {
  messages: [],
};

export default class Server {
  bootUp(host: string, port: number): Promise<void> {
    return new Promise(resolve => {
      const app = express();
      const http = new HttpServer(app);
      const io = SocketIo(http);

      app.use(cors());

      app.get('/', (_, res) => {
        res.send('game server is running.');
      });

      // tslint:disable-next-line:no-require-imports
      app.use('/db', require('express-pouchdb')(DB, { logPath: path.join(pouchDir, 'log.txt') }));
      const db = new DB('mydb');
      db.put({
        _id: 'hoge',
        yo: 'hello',
      }).then(() => {
        db.allDocs().then(console.log);
      });

      io.on('connect', socket => {
        this.initializeClientStates(socket);

        socket.on(Messages.CHAT_MESSAGE, (user: User, message: string, callback: Function) => {
          const chatMessage: ChatMessage = {
            id: `${Math.random()}`,
            user,
            message,
            createdAt: new Date().toISOString(),
          };
          chatState.messages = [chatMessage].concat(chatState.messages);

          io.sockets.emit(Messages.UPDATE_CHAT_STATE, chatState);
          callback();
        });
      });

      http.listen(port, host, () => {
        console.log(`running server ${host}:${port}`);
        resolve();
      });
    });
  }

  private initializeClientStates(socket: Socket) {
    socket.emit(Messages.UPDATE_CHAT_STATE, chatState);
  }
}
