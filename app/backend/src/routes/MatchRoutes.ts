import { Router } from 'express';
import matchesMiddleware from '../middleware/MatchesMiddleware';
import MatchController from '../controller/MatchController';
import LoginMiddleware from '../middleware/LoginMiddleware';

const MatchRouter = Router();

MatchRouter
  .patch(
    '/:id',
    (req, res) => MatchController.updateStatus(req, res),
  )
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
    LoginMiddleware.validateToken,
    (req, res) => MatchController.createMatch(req, res),
  );
export default MatchRouter;
