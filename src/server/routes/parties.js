const express = require('express');

const router = express.Router();
// const Countries = require('Countries-Api');
const wtf = require('wtf_wikipedia');

const fetch = require('node-fetch');

const User = require('../models/user');

router.get('/countries', (req, res) => {
  fetch('https://restcountries.eu/rest/v2/all')
    .then((resp) => resp.json())
    .then((data) => res.json(data))
    .catch((err) => console.log('Error:', err));
});

router.get('/dataParties/:key', async (req, res) => {
  const user = await User.findById(req.session.userId)
    .then((data) => {
      if (data) {
        return data;
      }
      return {
        favoriteHolidays: [],
      };
    })
    .catch((err) => console.log('Err userFind:', err));

  if (req.params.key === 'favorite') {
    res.json(user.favoriteHolidays);
  }

  const url = req.params.key === 'all' ? 'NextPublicHolidaysWorldwide' : `NextPublicHolidays/${req.params.key}`;

  const dataHolidays = await fetch(`https://date.nager.at/api/v2/${url}`)
    .then((data) => data.json())
    .catch((err) => console.log(err));

  const dataCountries = await fetch('https://restcountries.eu/rest/v2/all')
    .then((data) => data.json())
    .catch((err) => console.log(err));

  const combine = (dataPartyArr, dataCountyArr, userData) => {
    let combainData = [];
    if (dataPartyArr.length && dataCountyArr.length) {
      combainData = dataPartyArr.map((item) => {
        for (let i = 0; i < dataCountyArr.length; i++) {
          if (item.countryCode === dataCountyArr[i].alpha2Code) {
            for (let j = 0; j < userData.favoriteHolidays.length; j++) {
              if (
                userData.favoriteHolidays[j].country === dataCountyArr[i].name &&
                userData.favoriteHolidays[j].name === item.name &&
                userData.favoriteHolidays[j].date === item.date
              ) {
                return {
                  ...item,
                  country: dataCountyArr[i].name,
                  flag: dataCountyArr[i].flag,
                  like: true,
                };
              }
            }
            return {
              ...item,
              country: dataCountyArr[i].name,
              flag: dataCountyArr[i].flag,
              like: false,
            };
          }
        }
        return item;
      });
    }
    return combainData;
  };

  const combineData = combine(dataHolidays, dataCountries, user);
  await res.json(combineData);
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

router
  .route('/party')
  .post((req, res) => {
    User.findByIdAndUpdate(
      req.session.userId,
      { $push: { favoriteHolidays: req.body.likeHoliday } },
      { new: true },
      (err, user) => {
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
      },
    );
  })
  .delete((req, res) => {
    User.findByIdAndUpdate(
      req.session.userId,
      {
        $pull: { favoriteHolidays: { name: req.body.likeHoliday.name, country: req.body.likeHoliday.country } },
      },
      { new: true },
      (err, user) => {
        if (err) {
          res.json({
            status: 400,
            message: 'the user or holiday is not found',
          });
        }
        res.json({
          status: 200,
          message: 'holiday removed from the collection',
          user: {
            login: user.login,
            favoriteHolidays: user.favoriteHolidays,
          },
        });
      },
    );
  });

router.get('/resume', (req, res) => {
  console.log('hey this is resume server route');

  res.json({
    status: 200,
    resume: 'отправленное резюме',
  });
});

router.post('/', (req, res) => {
  wtf
    .fetch(`${req.body.name}`)
    .then((data) => data.text().substring(0, 1000))
    .then((data) => res.json(data))
    .catch(() => res.json('Sorry! There is no information about this holiday...'));
});

router.get('/availableCountries', (req, res) => {
  fetch('https://date.nager.at/api/v2/AvailableCountries')
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

      const userData = { login: '', favoriteHolidays: [] };
      return res.json({
        status: 200,
        message: 'Goodbye my love, goodbay!',
        user: userData,
      });
    });
  }
});

module.exports = router;
