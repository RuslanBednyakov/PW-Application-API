import express from 'express';
import * as Controller from '../controller';

const router = express.Router();

router.post('/sign-up', Controller.auth.signUp);
router.post('/sign-in', Controller.auth.signIn);

export { router as auth };