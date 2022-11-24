import { Request, Response } from 'express';
import MatchServices from '../services/MatchServices';

export default class MatchController {
  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const teams = await MatchServices.getMatchInProgress();
      return res.status(200).json(teams);
    }
    if (inProgress === 'false') {
      const teams = await MatchServices.getFinishedMatches();
      return res.status(200).json(teams);
    }
    const teams = await MatchServices.getAll();
    res.status(200).json(teams);
  }

  static async updateFinishedStatus(req: Request, res: Response) {
    const { id } = req.params;
    await MatchServices.updateFinishedStatus(id);
    res.status(200).json({ message: 'Finished' });
  }

  static async updateStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await MatchServices.updateStatus(id, homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message: 'ok' });
  }

  static async createMatch(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const teams = await MatchServices
      .createMatch(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    res.status(201).json(teams);
  }
}
