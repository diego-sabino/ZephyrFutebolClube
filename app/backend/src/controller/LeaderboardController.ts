import { Request, Response } from 'express';
import LeaderboardServices from '../services/LeaderboardServices';

export default class LeaderboardController {
  static async getAll(req: Request, res: Response) {
    try {
      const matches = await LeaderboardServices.getLeaderboard();
      res.status(200).json(matches);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
