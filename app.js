var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors({ origin: '*' }));
app.use(cors());

app.get('/ping', (req, res) => {
  res.send('pong');
})

// var connection = require('./connector');

// GET method
// /:id => client request path/url
// http://localhost:<PORT>/:id
// request: client request
// response: server response
// app.use(require('./routes'));

app.post('/watchlist', (req, res, next) => {
  // req.body
  const watchlist = req.body.watchlist;
  // Object.keys(non-empty object) => ['name']; 
  // Object.keys(empty object: {}) => [];
  // For example Object.keys(watchlist).length > 0
  if (watchlist.hasOwnProperty('name')) {
    console.log(watchlist);
    const { name } = watchlist;
    connection.query(`
      INSERT INTO watch_list (name) VALUES (?);
    `, [name], (err, results) => {
      if (err) {
        console.err(err);
        res.json({ error: 'Failed to add watchlist' });
        // res.json ~= return;
      }

      // inserted data successfully
      console.log('results', results);
      res.json({ watchlist: { id: results.insertId } });
    })
  } else {
    res.json({ error: 'Watchlist is not valid' });
  }
});

// app client router
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handles any requests that don't match the ones above
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
