import Team from '../database/models/Team';
import Match from '../database/models/Match';

const initialValue = 0;

export default class LeadboardServices {
  static async getAllMatches() {
    const teams = await Team.findAll();
    const matches = await Match.scope('homeLeaderboard').findAll();
    return teams.map((team) => matches.filter((match) => match.homeTeam === team.id));
  }

  static async getVictories() {
    const homeMatchs = await LeadboardServices.getAllMatches();
    return homeMatchs.map((match) => match
      .filter((matches) => matches.homeTeamGoals > matches.awayTeamGoals).length);
  }

  static async getDraw() {
    const homeMatchs = await LeadboardServices.getAllMatches();
    return homeMatchs.map((match) => match
      .filter((matches) => matches.awayTeamGoals === matches.homeTeamGoals).length);
  }

  static async getLosses() {
    const homeMatchs = await LeadboardServices.getAllMatches();
    return homeMatchs.map((match) => match
      .filter((matches) => matches.awayTeamGoals > matches.homeTeamGoals).length);
  }

  static async getGoalsOwn() {
    const homeMatchs = await LeadboardServices.getAllMatches();
    return homeMatchs.map((match) => {
      const allGoals = match.map((matches) => matches.awayTeamGoals);
      return allGoals.reduce((acc, crt) => acc + crt, initialValue);
    });
  }

  static async getGoalsFavor() {
    const homeMatchs = await LeadboardServices.getAllMatches();
    return homeMatchs.map((match) => {
      const allGoals = match.map((matches) => matches.homeTeamGoals);
      return allGoals.reduce((acc, crt) => acc + crt, initialValue);
    });
  }

  static async getPoints() {
    const draws = await LeadboardServices.getDraw();
    const victories = await LeadboardServices.getVictories();
    return victories.map((victory, i) => victory * 3 + draws[i]);
  }

  static async getTotalMatches() {
    const homeMatchs = await LeadboardServices.getAllMatches();
    return homeMatchs.map((match) => match.length);
  }

  static async getEfficiency() {
    const points = await LeadboardServices.getPoints();
    const totalGames = await LeadboardServices.getTotalMatches();
    return points.map((point, i) => point / ((totalGames[i] * 3) / 100));
  }

  static async getBalance() {
    const goalsOwn = await LeadboardServices.getGoalsOwn();
    const goalsFavor = await LeadboardServices.getGoalsFavor();
    return goalsFavor.map((goal, i) => goal - goalsOwn[i]);
  }

  static async getLeaderboard() {
    const teams = await Team.findAll();
    const leaderboard = await Promise.all(
      teams.map(async (team, i) => ({
        name: team.teamName,
        totalPoints: Object.values(await LeadboardServices.getPoints())[i],
        totalGames: Object.values(await LeadboardServices.getTotalMatches())[i],
        totalVictories: Object.values(await LeadboardServices.getVictories())[i],
        totalDraws: Object.values(await LeadboardServices.getDraw())[i],
        totalLosses: Object.values(await LeadboardServices.getLosses())[i],
        goalsFavor: Object.values(await LeadboardServices.getGoalsFavor())[i],
        goalsOwn: Object.values(await LeadboardServices.getGoalsOwn())[i],
        goalsBalance: Object.values(await LeadboardServices.getBalance())[i],
        efficiency: Object.values(await LeadboardServices.getEfficiency())[i].toFixed(2),
      })),
    );
    return leaderboard.sort((home, away) =>
      away.totalPoints - home.totalPoints || away.goalsBalance - home.goalsBalance
      || away.goalsFavor - home.goalsFavor || away.goalsOwn - home.goalsOwn);
  }
}
