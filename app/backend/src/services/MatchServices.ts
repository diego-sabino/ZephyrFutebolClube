import IMatch from '../interfaces/MatchInterface';
import Match from '../database/models/Match';

export default class TeamServices {
  static async getAll() {
    const matches = await Match.scope('all').findAll();
    return matches;
  }

  static async getMatchInProgress() {
    const matches = await Match.scope('inProgress').findAll();
    return matches;
  }

  static async getFinishedMatches() {
    const matches = await Match.scope('finished').findAll();
    return matches;
  }

  static async getById(id: number | string) {
    const matchById = await Match.findByPk(id);
    return matchById;
  }

  static async createMatch(
    homeTeam: IMatch,
    awayTeam: IMatch,
    homeTeamGoals: IMatch,
    awayTeamGoals: IMatch,
  ) {
    const matchById = await Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true });
    return matchById;
  }

  // static async LoginValidateRole(username: string) {
  //   const user = await User.findOne({ where: { username } });
  //   if (user) {
  //     const { role } = user;
  //     return role;
  //   }
  // }
}
