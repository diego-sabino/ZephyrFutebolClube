import { Request, Response } from 'express';
import TeamServices from '../services/TeamServices';

export default class TeamController {
  static async getAllTeams(req: Request, res: Response) {
    try {
      const teams = await TeamServices.getAll();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async getTeamById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const teams = await TeamServices.getById(id);
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
