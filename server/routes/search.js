import express from 'express';
import * as Controller from '../controller';

const router = express.Router();
router.get('/user', Controller.users.getUsersByName);

export { router as search };