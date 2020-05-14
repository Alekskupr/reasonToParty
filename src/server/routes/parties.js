const express = require('express');
const router = express.Router();

const fetch = require('node-fetch');

router.get('/', async (req, res) => {
  const resp = await fetch('https://date.nager.at/api/v2/NextPublicHolidaysWorldwide');
  const reasons = await resp.json();
  await res.json(reasons);
});

module.exports = router;