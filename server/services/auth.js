import jwt from 'jsonwebtoken';
import config from '../config/config';

export function signToken(user_id) {
  return jwt.sign({ id: user_id }, config.secret, { expiresIn: '7d' });
}

export function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  jwt.verify(token, config.secret, (err, decoded) => {
    req.user = decoded.id;
    next(err)
  });
}