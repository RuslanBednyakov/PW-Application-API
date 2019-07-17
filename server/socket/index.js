import socketIo from 'socket.io';
import config from '../config/config'
import Sequelize from 'sequelize';
import db from '../model'

const Op = Sequelize.Op;

export function socketServer (server) {

  const io = socketIo(server);

  io.use(function(socket, next) {
    let userId = socket.handshake.query.userId;

    db.User
    .findOne({ where: { id: { [Op.eq]: userId } } })
    .then(user => {
      if (user !== null) {
        socket.userId = userId;
        next();
      } else {
        next(new Error());
      }
    })
    .catch(err => { 
      throw new Error(err.message)
    })
  });

  io.on('connection', function (socket) {

    const userName = socket.user.name;

    socket.broadcast.emit('join', userName);

    socket.on('message', function (message, cb) {
      socket.broadcast.emit('message', userName, message);
      cb(userName)
    });

    socket.on('Test', function () {
      socket.emit('testBack', 'message');
    });

    socket.on('disconnect', function () {
      socket.broadcast.emit('leave', userName);
    });

  });

  return io;
}