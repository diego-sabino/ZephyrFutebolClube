import Team from '../database/models/Team';

export default class TeamServices {
  static async getAll() {
    const teams = await Team.findAll();
    return teams;
  }

  // static async LoginValidateRole(username: string) {
  //   const user = await User.findOne({ where: { username } });
  //   if (user) {
  //     const { role } = user;
  //     return role;
  //   }
  // }
}
