import Sequelize from 'sequelize';
import { createPass, comparePass } from '../services/hash';
import db from '../model';
import { signToken } from '../services/auth';

const Op = Sequelize.Op;

export function signUp(req, res, next){
  const data = req.body;
  let response;
  const pass = data.password;
  const hashPass = createPass(pass);

  db.User
  .findOrCreate({
    where: {
      email: data.email
    }, 
    defaults: {
      name: data.name,
      password: hashPass
    }
  })
  .then(([user, created]) => {
    if(created) {
      const id = user.dataValues.id;
      const token = signToken(id);

      db.Balance.create({ balance: 500 })
        .then((balance) => {
          user.setUserBalance(balance).catch(err=>console.log(err))
        })

      response = {
        message: 'Sign-up successfully',
        result: 1,
        data: {
          token,
          user: {
            user_id: id,
            name: data.name,
            email: data.email
          }
        }
      }
    } else {
      response = {
        message: 'This email already exists',
        result: 1
      }
    }
    res.status(200).send(response);
  })
  .catch((err) => {
    next(new Error(err.message));
  })
}

export function signIn(req, res, next){

  const data = req.body;

  db.User
    .findOne({ where: { email: { [Op.eq]: data.email } } })
    .then(user => {
      if (user !== null && comparePass(user.dataValues, data.password)) {
        // req.session.user = user.dataValues.id;
        let token = signToken(user.dataValues.id);
        res.status(200).send({
          result: 1,
          data: {
            token,
            user: {
              user_id: user.id,
              name: user.name,
              email: user.email
            }
          },
          message: 'Sign-in successfully.'
        })
      } else  {
        res.status(401).send({
          result: 2,
          message: 'Incorrect login or password.'
        })
      }
    })
    .catch(err => { 
      next( new Error(err.message) )
    })
}

export function checkEmail(req, res, next){
  const data = req.body;
  console.log('checkEmail!!!!!!!!!!!!', data)
  let response;

  db.User
  .findOne({
    where: {
      email: data.email
    }, 
  })
  .then((user) => {
    if(user) {
      response = {
        message: 'This email already exists',
        result: 1
      }
    } else {
      response = {
        message: 'Email succussed',
        result: 2
      }
    }
    res.status(200).send(response);
  })
  .catch((err) => {
    next(new Error(err.message));
  })
}