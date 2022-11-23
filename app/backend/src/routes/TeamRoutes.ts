import { Router } from 'express';
import TeamController from '../controller/TeamController';

const loginRouter = Router();

loginRouter
  .get(
    '/',
    (req, res) => TeamController.getAllTeams(req, res),
  );

export default loginRouter;
