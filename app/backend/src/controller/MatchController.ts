import { Request, Response } from 'express';
import MatchServices from '../services/MatchServices';

export default class MatchController {
  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    try {
      if (inProgress) {
        const teams = await MatchServices.getMatchInProgress();
        return res.status(200).json(teams);
      }
      const teams = await MatchServices.getAll();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async getMatchInProgress(req: Request, res: Response) {
    try {
      const teams = await MatchServices.getMatchInProgress();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async getTeamById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const teams = await MatchServices.getById(id);
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
