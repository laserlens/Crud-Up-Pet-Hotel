var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'pethotel',
};
var pool = new pg.Pool(config);

// router.get('/view', function (req, res) {
//   res.sendFile(path.join(__dirname, './public/views/checkin_checkout.html'));
// });

//gets a table with the owner name pet and its visits
router.get('/visits', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('SELECT owners.id AS ownerID, first_name, last_name, pets.id AS pets_id, pet_name animal_type, color, owner_id, visits.id AS visitsid, check_in, check_out, pet_id FROM owners LEFT JOIN pets ON owners.id = pets.owner_id LEFT JOIN visits ON pets.id = visits.pet_id GROUP BY owners.id, pets.id, first_name, last_name, visits.id;', function (err, result) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
          return;
        }

        res.send(result.rows);
        res.sendStatus(200);
      });
    } finally {
      done();
    }
  });
});

//allows you to add a new visit
router.post('/', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('INSERT INTO visits (check_in, check_out, pet_id) VALUES ($1, $2, $3)',
                  [req.body.checkIn, req.body.checkOut, req.body.petId],
                  function (err, result) {
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

//allows you to update visits
router.put('/', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('UPDATE visits SET check_in=$2, check_out=$3, pet_id=$4 WHERE id=$1;',
                  [req.body.id, req.body.checkIn, req.body.checkOut, req.body.petId],
                  function (err, result) {
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
