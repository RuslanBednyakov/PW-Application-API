import express from 'express';
import * as Controller from '../controller';

const router = express.Router();
console.log('Router Protected User')
router.get('/balance', Controller.users.getUserBalance);
router.get('/', Controller.users.getUser);

export { router as user };