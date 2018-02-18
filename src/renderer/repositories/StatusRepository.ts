import * as SocketIO from 'socket.io-client';

export class StatusRepository {
  testConnectivity(host: string, port: number, timeoutMsec: number = 5000): Promise<void> {
    return new Promise((resolve, reject) => {
      const io = SocketIO(`http://${host}:${port}/status`);
      let resolved = false;
      let rejected = false;

      io.on('connect', () => {
        if (rejected) return;
        resolved = true;
        resolve();
      });

      setTimeout(() => {
        if (resolved) return;
        rejected = true;
        reject();
      }, timeoutMsec);
    });
  }
}
