var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'pethotel'
}

var pool = new pg.Pool(config);

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/new_user.html'));
});

router.post('/', function(req, res) {
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('INSERT INTO owners (first_name, last_name) VALUES ($1, $2)',
                  [req.body.first_name, req.body.last_name],
                  function(err, result) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      });
    } finally {
      done();
    }
  });
});


module.exports = router;
