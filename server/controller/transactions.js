import Sequelize from 'sequelize';
import db from '../model';

const Op = Sequelize.Op;

export async function getUserTransactionsHistory(req, res, next){
  try {
    const id = req.user;

    const response = await db.Transaction.findAll({
      where: {
        [Op.or]: [
          { sender_id: id },
          { recipient_id: id }
        ]
      }
    });

    res.status(200).send(response);
  } catch(err) {
    next(new Error(err.message));
  }

}

export async function createNewTransaction(req, res, next) {
  try {
    const sender_id = req.user;
    const {date, amount, recipient_id} = req.body;

    const sender_result_balance = await db.Balance
      .findByPk(sender_id)
      .then((balance) => {
       return balance.decrement('balance', {by: amount})
      });
    const recipient_result_balance = await db.Balance
      .findByPk(recipient_id)
      .then((balance) => {
       return balance.increment('balance', {by: amount})
      })

    const response = await db.Transaction.create({
      date,
      amount,
      sender_id,
      sender_result_balance,
      recipient_id,
      recipient_result_balance,
    });

    res.status(201).send(response);

  } catch(err) {
    
    next(new Error(err.message));
  }
}