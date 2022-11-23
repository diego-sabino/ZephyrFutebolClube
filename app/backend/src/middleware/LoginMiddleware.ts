import { NextFunction, Request, Response } from 'express';
import * as Bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/User';
import IReq from '../interfaces/RequestInterface';

export default class LoginMiddleware {
  static async loginField(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const validUser = await User.findOne({ where: { email } });

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!validUser) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    if (!Bcrypt.compareSync(password, validUser?.password as string)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    next();
  }

  static async validateToken(req: IReq, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Token not found' });
    try {
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET as string);
      const { data } = verifyToken as jwt.JwtPayload;
      console.log(data);
      req.user = data;
    } catch (_e) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    next();
  }
}
