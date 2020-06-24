const express = require('express');

const router = express.Router();
// const Countries = require('Countries-Api');
const wtf = require('wtf_wikipedia');

const fetch = require('node-fetch');

const User = require('../models/user');

router.get('/', async (req, res) => {
  const resp = await fetch('https://date.nager.at/api/v2/NextPublicHolidaysWorldwide');
  const reasons = await resp.json();
  await res.json(reasons);
});

router.get('/user', (req, res) => {
  User.findById(req.session.userId)
    .then((user) => {
      if (user) {
        const userData = {
          login: user.login,
          favoriteHolidays: user.favoriteHolidays,
        };
        res.json(userData);
      }
    })
    .catch((err) => {
      console.log('Error user', err);
    });
});

router.post('/party', (req, res) => {
  // console.log(req.session);
  console.log(req.body.likeHoliday);
  // const { flag, name, date, country } = req.body;
  // PersonModel.update({ _id: person._id }, { $push: { friends: friend } }, done);
  User.findByIdAndUpdate(req.session.userId, { $push: { favoriteHolidays: req.body.likeHoliday } }, (err, user) => {
    if (err) {
      res.json({
        status: 400,
        message: 'the user is not found',
      });
    }
    res.json({
      status: 200,
      message: 'holiday added to the collection',
      user: {
        login: user.login,
        favoriteHolidays: user.favoriteHolidays,
      },
    });
  });
});

router.get('/availableCountries', (req, res) => {
  fetch('https://date.nager.at/api/v2/AvailableCountries')
    .then((resp) => resp.json())
    .then((data) => res.json(data))
    .catch((err) => console.log('Error:', err));
});

router.get('/countries', (req, res) => {
  fetch('https://restcountries.eu/rest/v2/all')
    .then((resp) => resp.json())
    .then((data) => res.json(data))
    .catch((err) => console.log('Error:', err));
});

router.post('/', (req, res) => {
  wtf
    .fetch(`${req.body.name}`)
    .then((data) => data.text().substring(0, 1000))
    .then((data) => res.json(data))
    .catch(() => res.json('Sorry! There is no information about this holiday...'));
});

router.get('/countryParties/:key', (req, res) => {
  fetch(`https://date.nager.at/api/v2/NextPublicHolidays/${req.params.key}`)
    .then((resp) => resp.json())
    .then((data) => res.json(data))
    .catch((err) => console.log('Error:', err));
});

router.post('/registration', (req, res) => {
  const { email, login, password, subscription } = req.body;

  User.findOne({ login }, (err, data) => {
    if (err) {
      return res.json({
        status: 400,
        message: err,
        // authUser: false,
      });
    }
    if (data) {
      return res.json({
        status: 400,
        message: 'User already exist',
        // authUser: false,
      });
    }

    const newUser = new User({
      email,
      login,
      password,
      subscription,
      favoriteHolidays: [],
    });
    newUser.save((error, user) => {
      if (error) {
        return res.json({
          status: 400,
          message: error,
          // authUser: false,
        });
      }
      req.session.userId = user._id;
      const userData = {
        login: user.login,
        favoriteHolidays: user.favoriteHolidays,
      };
      return res.json({
        status: 200,
        message: 'You have succesfully registered.',
        user: userData,
        // authUser: true,
      });
    });
  });
});

router.post('/authorization', (req, res) => {
  const { login, password } = req.body;
  User.findOne({ login, password }, (err, user) => {
    if (err || !user) {
      return res.json({
        status: 401,
        message: 'Invalid username or password',
        // authUser: false,
      });
    }
    req.session.userId = user._id;
    const userData = {
      login: user.login,
      favoriteHolidays: user.favoriteHolidays,
    };
    return res.json({
      status: 200,
      message: 'You have succesfully loggedin.',
      user: userData,
      // authUser: true,
    });
  });
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return {
          status: 400,
          message: err,
        };
      }
      return res.json({
        status: 200,
        message: 'Goodbye my love, goodbay!',
      });
    });
  }
});

module.exports = router;
