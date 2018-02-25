import {WebsocketActionDispatcher} from '../../modules/websocket';
import {ServerActionDispatcher} from '../../modules/server';
import {Dispatch} from 'redux';
import {push} from 'react-router-redux';

export class MenuPagePresenter {
  constructor(
    private dispatch: Dispatch<any>,
    private websocketActionDispatcher: WebsocketActionDispatcher,
    private serverActionDispatcher: ServerActionDispatcher,
  ) {}

  async bootUpServer(host: string, port: number): Promise<void> {
    try {
      await this.serverActionDispatcher.bootUpServer(host, port);
      await this.connectToServer(host, port);
    } catch (e) {
      // tslint:disable-next-line no-unused-expression
      new Notification('サーバーの起動に失敗しました', {
        body: e.toString(),
      });
    }
  }

  async connectToServer(host: string, port: number): Promise<void> {
    try {
      await this.websocketActionDispatcher.connect(host, port);
      this.dispatch(push('/lounge'));
    } catch (e) {
      console.error(e);
      // tslint:disable-next-line no-unused-expression
      new Notification('サーバー接続に失敗しました', {
        body: e.toString(),
      });
    }
  }
}
