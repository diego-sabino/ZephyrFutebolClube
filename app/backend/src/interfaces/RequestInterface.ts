import { Request } from 'express';
import User from '../database/models/User';

export default interface IReq extends Request {
  user?: User;
}
