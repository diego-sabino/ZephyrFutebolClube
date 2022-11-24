import { Router } from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const LeaderboardRouter = Router();

LeaderboardRouter
  .get(
    '/home',
    (req, res) => LeaderboardController.getAll(req, res),
  );

export default LeaderboardRouter;
