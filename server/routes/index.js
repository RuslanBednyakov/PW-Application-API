import express from 'express';
import { auth } from './auth';
import { search } from './search';
import { user } from './user';
import { transactions } from './transactions';

const routerProtected = express.Router();
const routerUnprotected = express.Router();

routerUnprotected.use('/auth', auth);

routerProtected.use('/user', user);
routerProtected.use('/search', search);
routerProtected.use('/transactions', transactions);

export default {
  protected: routerProtected,
  unprotected: routerUnprotected
};