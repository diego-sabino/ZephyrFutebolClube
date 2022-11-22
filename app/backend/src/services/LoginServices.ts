import User from '../database/models/User';
import createToken from './AuthServices';

export default class LoginServices {
  model = User;
  async LoginAuth(email: string) {
    const user = await this.model.findOne({ where: { email } });
    if (user) {
      const { username } = user;
      const newToken = createToken({ username });
      return newToken;
    }
  }
}
