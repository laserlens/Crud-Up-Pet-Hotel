var express = require('express');
var app = express();
var newUser = require('./routes/new_user');
var addRemove = require('./routes/add_remove');
var checkinCheckout = require('./routes/checkin_checkout');
var landing = require('./routes/landing');
var bodyParser = require('body-parser');
var path = require('path');

// middleware running
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// routes running
app.use('/newUser', newUser);
//app.use('/add_remove', addRemove);
// app.use('/checkin_checkout', checkinCheckout);


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/landing.html'));
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Listening on port ', server.address().port);
});
