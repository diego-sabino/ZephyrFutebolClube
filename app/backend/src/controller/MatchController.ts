import { Request, Response } from 'express';
import MatchServices from '../services/MatchServices';

export default class MatchController {
  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    try {
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

  static async updateFinishedStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await MatchServices.updateFinishedStatus(id);
      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async createMatch(req: Request, res: Response) {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
      if (homeTeam === awayTeam) {
        return res.status(422)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      const teams = await MatchServices
        .createMatch(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
      res.status(201).json(teams);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}
