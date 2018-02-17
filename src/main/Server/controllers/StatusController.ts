import {Request, Response} from 'express';

export class StatusController {
  static getStatus(_req: Request, res: Response): void {
    res.send('game server is running.');
  }
}
