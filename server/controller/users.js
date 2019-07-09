import Sequelize from 'sequelize';
import db from '../model';
import { signToken } from '../services/auth';

const Op = Sequelize.Op;

export function getUsersByName(req, res, next){

  const userId = req.user;
  const char = req.query.name;

  db.User
    .findAndCountAll({ 
      attributes: { exclude: ['password'] },
      where: { 
        name: { [Op.iLike]: `%${char}%`},
        id: {[Op.ne]: userId}
      }
    })
    .then(users => {
      console.log('Searching result', users)
      if (users !== null) {
        res.status(200).send({
          result: 1,
          data: users,
          message: 'Search successfull'
        })
      } else  {
        res.send({
          result: 2,
          message: 'No results'
        })
      }
    })
    .catch(err => { 
      next( new Error(err.message) )
    })
}

export function getUser(req, res, next){
  console.log('getUser');
  let response;
  const id = req.user
  console.log('getUser id', id)
  let token = signToken(id);

  db.User
    .findByPk(id).then(user => {
      console.log('found user', user)
      if(user) {
        response = {
          message: 'User authorised',
          result: 1,
          data: {
            token,
            user: {
              name: user.dataValues.name,
              email: user.dataValues.email
            }
          }
        }
      } else {
        response = {
          message: 'User unauthorised',
          result: 1,
        }
      }

      res.status(200).send(response);
    })
}

export function getUserBalance(req, res, next){
  
  const id = req.user;
  let response;

  db.Balance
    .findOne({ where: { id: { [Op.eq]: id } } })
    .then(balanceInfo => {
      if (balanceInfo !== null) {
        res.status(200).send({
          result: 1,
          data: {
            balanceInfo: {
              balance: balanceInfo.balance
            }
          },
          message: 'Get balance successed.'
        })
      } else  {
        res.send({
          result: 2,
          message: 'Sorry, something went wrong'
        })
      }
    })
    .catch(err => { 
      next( new Error(err.message) )
    })

  res.status(200).send(response);
}