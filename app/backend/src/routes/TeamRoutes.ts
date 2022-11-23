import { Router } from 'express';
import TeamController from '../controller/TeamController';

const TeamRouter = Router();

TeamRouter
  .get(
    '/',
    (req, res) => TeamController.getAllTeams(req, res),
  )
  .get(
    '/:id',
    (req, res) => TeamController.getTeamById(req, res),
  );

export default TeamRouter;
