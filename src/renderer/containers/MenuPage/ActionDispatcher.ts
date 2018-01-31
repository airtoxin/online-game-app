import {Dispatch} from 'redux';
import {push} from 'react-router-redux';
import {ActionDispatcher as ServerActionDispatcher} from '../../modules/server';

export default class MenuPageActionDispatcher {
  constructor(
    private dispatch: Dispatch<any>,
    private serverActionDispatcher: ServerActionDispatcher,
  ) {}

  async bootUpServer(host: string, port: number) {
    await this.serverActionDispatcher.bootUpServer(host, port);
    this.dispatch(push('/lounge'));
  }
}
