import { Router } from 'express';
import matchesMiddleware from '../middleware/MatchesMiddleware';
import MatchController from '../controller/MatchController';

const MatchRouter = Router();

MatchRouter
  .patch(
    '/:id/finish',
    (req, res) => MatchController.updateFinishedStatus(req, res),
  )
  .get(
    '/',
    (req, res) => MatchController.getAllMatches(req, res),
  )
  .post(
    '/',
    matchesMiddleware.matchesField,
    (req, res) => MatchController.createMatch(req, res),
  );
export default MatchRouter;
