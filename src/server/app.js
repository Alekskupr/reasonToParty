require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const schedule = require('node-schedule');

// const createError = require('http-errors');
// const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const mailer = require('./mailer');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/reasonToParty', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const partiesRouter = require('./routes/parties');

const app = express();
// app.use(express.static('dist'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors);
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

app.get('/api/resume', (req, res) => {
  fs.readFile(`public/resume.pdf`, (err, data) => {
    if (data) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.writeHead(200, { 'Content-Type': 'application/pdf' });
      res.write(data);
      res.end();
    } else {
      console.log(err);
    }
  });
});

const rule = new schedule.RecurrenceRule();
rule.hour = 17;
rule.minute = 11;

const j = schedule.scheduleJob(rule, async () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  const day = now.getDate();
  const date = `${year}-${month}-${day}`;
  const subscribers = await User.find({ subscription: true, 'favoriteHolidays.date': date });

  subscribers.forEach((user) => {
    user.favoriteHolidays.forEach((holiday) => {
      if (holiday.date === date) {
        const message = {
          to: `${user.email}`,
          subject: 'hey! party time!',
          html: `<h2>hello, ${user.login}! don't forget to celebrate the ${holiday.name} with the people of ${holiday.country} today!<h2>
          <h4>Learn more about the holiday on <a href = "http://127.0.0.1:9000">reasontoparty</a></h4>
          `,
        };
        mailer(message);
      }
    });
  });
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
