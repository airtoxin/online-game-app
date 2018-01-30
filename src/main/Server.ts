import { Server as HttpServer } from 'http';
import * as express from 'express';

export default class Server {
  bootUp(host: string, port: number): Promise<void> {
    return new Promise(resolve => {
      const app = express();
      const http = new HttpServer(app);

      app.get('/', (_, res) => {
        res.send('gameserver is running.');
      });

      http.listen(port, host, resolve);
    });
  }
}
