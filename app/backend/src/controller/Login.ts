import { Request, Response } from 'express';
import IReq from '../interfaces/RequestInterface';
import LoginServices from '../services/LoginServices';

export default class LoginController {
  static async loginAuth(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const token = await LoginServices.LoginAuth(email);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async loginValidate(req: IReq, res: Response) {
    const username = req.user?.username as string;
    console.log(username);
    const role = await LoginServices.LoginValidateRole(username);

    res.status(200).json({ role });
  }
}
