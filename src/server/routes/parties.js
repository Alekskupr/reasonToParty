const express = require('express');

const router = express.Router();
// const Countries = require('Countries-Api');
const wtf = require('wtf_wikipedia');

const fetch = require('node-fetch');

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
  fetch(`https://date.nager.at/api/v2/PublicHolidays/2020/${req.params.key}`)
    .then((resp) => resp.json())
    .then((data) => res.json(data))
    .catch((err) => console.log('Error:', err));
});

module.exports = router;
