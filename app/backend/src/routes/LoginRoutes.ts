import { Router } from 'express';
import LoginMiddleware from '../middleware/LoginMiddleware';
import LoginController from '../controller/LoginController';

const loginRouter = Router();

loginRouter
  .post('/', LoginMiddleware.loginField, (req, res) => LoginController.loginAuth(req, res))
  .get(
    '/validate',
    LoginMiddleware.validateToken,
    (req, res) => LoginController.loginValidate(req, res),
  );

export default loginRouter;
