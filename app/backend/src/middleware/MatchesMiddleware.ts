import { NextFunction, Request, Response } from 'express';
import TeamServices from '../services/TeamServices';

export default class matchesMiddleware {
  static async matchesField(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const validBody = homeTeam && awayTeam && homeTeamGoals && awayTeamGoals;

    const homeTeamExists = await TeamServices.getById(homeTeam);
    const awayTeamExists = await TeamServices.getById(awayTeam);
    console.log(homeTeamExists);

    if (!homeTeamExists || !awayTeamExists) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    if (homeTeam === awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (!validBody) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }
}
