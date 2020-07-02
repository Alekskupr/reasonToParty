const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const createError = require('http-errors');
// const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost:27017/reasonToParty', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const partiesRouter = require('./routes/parties');

const app = express();
// app.use(express.static('dist'));
app.use(morgan('dev'));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    key: 'user_sid',
    secret: 'secret secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 25,
    },
  }),
);

app.use('/api/parties/dataParties', (req, res, next) => {
  console.log('dataParties');
  next();
});
// const checkSession = (req, res, next) => {
//   // console.log(req.session);
//   if (req.session.user) {
//     res.json({ user: req.session.user });
//   }
//   next();
// };

// app.use(checkSession);

app.use('/api/parties', partiesRouter);

module.exports = app;
