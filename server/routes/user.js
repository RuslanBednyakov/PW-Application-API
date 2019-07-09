import express from 'express';
import * as Controller from '../controller';

const router = express.Router();
router.get('/balance', Controller.users.getUserBalance);
router.get('/', Controller.users.getUser);

export { router as user };