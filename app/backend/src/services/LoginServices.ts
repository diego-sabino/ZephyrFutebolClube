import User from '../database/models/User';
import createToken from './AuthServices';

export default class LoginServices {
  static async LoginAuth(userInfo: string) {
    const user = await User.findOne({ where: { email: userInfo } });
    if (user) {
      const { username, email } = user;
      const newToken = createToken({ username, email });
      return newToken;
    }
  }

  static async LoginValidateRole(username: string) {
    const user = await User.findOne({ where: { username } });
    if (user) {
      const { role } = user;
      return role;
    }
  }
}
