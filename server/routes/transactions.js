import express from 'express';
import * as Controller from '../controller';

const router = express.Router();

router.get('/history', Controller.transactions.getUserTransactionsHistory);
router.post('/new', Controller.transactions.createNewTransaction);

export { router as transactions };