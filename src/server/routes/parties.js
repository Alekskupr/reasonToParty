const express = require('express');
const router = express.Router();
// const Countries = require('Countries-Api');

const fetch = require('node-fetch');

router.get('/', async (req, res) => {
  const resp = await fetch('https://date.nager.at/api/v2/NextPublicHolidaysWorldwide');
  const reasons = await resp.json();
  await res.json(reasons);
});

router.get('/countries', async (req, res) => {
  fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log('Error:', err));
})

module.exports = router;