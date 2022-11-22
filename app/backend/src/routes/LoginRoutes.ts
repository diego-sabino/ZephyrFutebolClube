import { Router } from 'express';
import LoginController from '../controller/Login';

const loginRouter = Router();

loginRouter.post('/', LoginController.loginAuth);

export default loginRouter;
