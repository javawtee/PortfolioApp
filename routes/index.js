var express = require('express');
var router = express.Router();
var conn = require('../connector');

const watchlistRoutes = require('./watchlist');
const symbolRoutes = require('./symbol');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/watchlist')
  .get((req, res) => {
    conn.query(`
      SELECT 
      watch_list_symbol.created_at AS addToWatchListAt, 
      s.symbol, s.display_name, s.description, currency, s.updated_at AS symbolUpdatedAt,
      name, w.created_at AS watchListCreatedAt
      FROM ((watch_list_symbol
      INNER JOIN symbol s ON s.symbol = watch_list_symbol.symbol)
      INNER JOIN watch_list w ON w.id = watch_list_symbol.watch_list_id);
    `, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  })
  .post((req, res) => {
    res.send(req.body);
  });

// router.use(() => watchlistRoutes(router, conn));
// router.use('/symbol', symbolRoutes(router));

module.exports = router;
