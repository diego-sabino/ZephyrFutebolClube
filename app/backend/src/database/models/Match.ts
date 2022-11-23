import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  tableName: 'matches',
  timestamps: false,
  scopes: {
    all: { include: [
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
    ] },
    inProgress: { where: { inProgress: true },
      include: [
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      ] },
    finished: { where: { inProgress: false },
      include: [
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      ] },
  },
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'matches' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'matchesInAway' });

export default Match;
