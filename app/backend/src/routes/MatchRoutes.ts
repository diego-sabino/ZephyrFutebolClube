import { Router } from 'express';
import MatchController from '../controller/MatchController';

const MatchRouter = Router();

MatchRouter
  .get(
    '/',
    (req, res) => MatchController.getAllMatches(req, res),
  );

export default MatchRouter;
