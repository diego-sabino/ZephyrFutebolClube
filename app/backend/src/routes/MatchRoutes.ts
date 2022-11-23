import { Router } from 'express';
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
    (req, res) => MatchController.createMatch(req, res),
  );
export default MatchRouter;
