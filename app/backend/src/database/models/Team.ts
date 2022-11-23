import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class team extends Model {
  declare id: number;
  declare teamName: string;
}

team.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
});

export default team;
