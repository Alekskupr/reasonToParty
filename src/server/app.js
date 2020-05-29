const express = require('express');
const morgan = require('morgan');
const partiesRouter = require('./routes/parties');

const app = express();

// app.use(express.static('dist'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/parties', partiesRouter);

app.get('/api/test', (req, res) => {
  res.send('привет от сервераaaaa');
});

module.exports = app;

// app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
