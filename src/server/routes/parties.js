const express = require('express');

const router = express.Router();
// const Countries = require('Countries-Api');
const wtf = require('wtf_wikipedia');

const fetch = require('node-fetch');
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/', async (req, res) => {
  const resp = await fetch('https://date.nager.at/api/v2/NextPublicHolidaysWorldwide');
  const reasons = await resp.json();
  await res.json(reasons);
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
        authUser: false,
      });
    }
    if (data) {
      return res.json({
        status: 400,
        message: 'User already exist',
        authUser: false,
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
          authUser: false,
        });
      }
      return res.json({
        status: 200,
        message: 'You have succesfully registered.',
        user,
        authUser: true,
      });
    });
  });
});

router.post('/authorization', (req, res) => {
  const { login, password } = req.body;
  User.findOne({ login, password }, (err, data) => {
    if (err || !data) {
      return res.status(401).json({
        status: 401,
        message: 'Invalid username or password',
        authUser: false,
      });
    }
    return res.status(200).json({
      message: 'You have succesfully loggedin.',
      user: data,
      authUser: true,
    });
  });
});

module.exports = router;
