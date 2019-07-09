import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from '../services/passport';
import router from '../routes';

const app = express();

app.use(cors());
app.use(cookieParser());

app.use(passport.initialize())

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.raw({ type: 'application/yaml' }));

app.use('/', express.static('./public'));
app.use('/api/v1', router.unprotected);
app.use('/api/v1', passport.authenticate('jwt', { session: false }), router.protected);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler
// Displays stacktrace to the user
if (app.get('env') === 'development') {
  app.use(function(error, req, res, next) {
    res.status(error.status || 500);
    console.log('Error from middleware', error);
    
    res.send({message: error.message, error});
  });
}

// Production error handler
// Does not display stacktrace to the user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

export default app;