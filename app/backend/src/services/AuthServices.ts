import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import IUser from '../interfaces/LoginInterface';

const createToken = (user: IUser) => {
  const jwtConfig = {
    secret: String(process.env.JWT_SECRET),
    expiresIn: '30d',
  };
  const newToken = jwt.sign({ data: user }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  return newToken;
};

export default createToken;
