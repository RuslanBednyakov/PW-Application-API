import express from 'express';
import * as Controller from '../controller';

const router = express.Router();

console.log('Router Unprotected');

router.post('/sign-up', Controller.auth.signUp);
router.post('/sign-in', Controller.auth.signIn);
router.post('/check', Controller.auth.checkEmail);

export { router as auth };