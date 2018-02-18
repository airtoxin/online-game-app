import {WebsocketActionDispatcher} from '../../modules/websocket';
import {ServerActionDispatcher} from '../../modules/server';

export class MenuPagePresenter {
  constructor(
    private websocketActionDispatcher: WebsocketActionDispatcher,
    private serverActionDispatcher: ServerActionDispatcher,
  ) {}

  async bootUpServer(host: string, port: number): Promise<void> {
    try {
      await this.serverActionDispatcher.bootUpServer(host, port);
      await this.connectToServer(host, port);
    } catch {
      // tslint:disable-next-line no-unused-expression
      new Notification('サーバーの起動に失敗しました');
    }
  }

  async connectToServer(host: string, port: number): Promise<void> {
    try {
      await this.websocketActionDispatcher.connect(host, port);
    } catch {
      // tslint:disable-next-line no-unused-expression
      new Notification('サーバー接続に失敗しました');
    }
  }
}
