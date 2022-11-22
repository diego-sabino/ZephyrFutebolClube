import { Request, Response } from 'express';
import LoginServices from '../services/LoginServices';

export default class LoginController {
  static async loginAuth(req: Request, res: Response) {
    const { email } = req.body;
    const newLogin = new LoginServices();
    const token = await newLogin.LoginAuth(email);
    res.status(200).json({ token });
  }
}
