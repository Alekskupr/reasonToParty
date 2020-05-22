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

router.get('/countries', (req, res) => {
  fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(data => res.json(data))
    .catch(err => console.log('Error:', err));
})

router.post('/', (req, res) => {
  console.log(req.body.party);
  
  wtf
    .fetch(`${req.body.party.name}`)
    .then(data => data.text().substring(0, 1000))
    .then(data => res.json(data))
    .catch(err => res.json({err: 'нет данных о празднике'}));
})

module.exports = router;