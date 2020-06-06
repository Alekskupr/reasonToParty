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

router.post('/registration', async (req, res) => {
  const { email, login, password, subscription } = req.body;
  try {
    const newUser = await new User({
      email,
      login,
      password,
      subscription,
      favoriteHolidays: [],
    });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.json(err);
  }
});

router.post('/authorization', async (req, res) => {
  const { login, password } = req.body;
  const findUser = await User.findOne({ login });
  const message = 'invalid username or password';
  // findUser.password === password ? res.json(findUser) : res.json({ message });
  findUser.password === password ? await res.json(findUser) : await res.json({ message });
});

module.exports = router;
