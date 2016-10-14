var resultArray = [];
var visit = {};
var sendObject = {};
$(function () {
  getVisits();
  $('.ownersDynamic').on('click', '.checkOut', function () {

    checkOut($(this).data('object'));
  });

  $('.ownersDynamic').on('click', '.checkIn', function () {
    $(this).data('object');
    checkIn($(this).data('object'));
  });
});

function getVisits() {
  $('.ownersDynamic').empty();
  $.ajax({
    type: 'GET',
    url: '/checkin_checkout/visits',
    success: appendVisits,
  });
};

function appendVisits(reference) {
  $('.visit').empty();
  $('.ownersDynamic').empty();
  visit = {};
  reference.forEach(function (referenceObj) {
    resultArray.push(referenceObj);
  });

  resultArray.sort(function (a, b) {return a.ownerid - b.ownerid;});

  resultArray.forEach(function (resultObj) {

    var $visit = $('<div class="visit"></div>');
    if ($('.ownersDynamic').data('id') != resultObj.ownerid) {
      $('.ownersDynamic').append($('<div class="owner well"><h2>' + resultObj.first_name + ' ' + resultObj.last_name + '</h2></div>'));
      $('.ownersDynamic').data('id', resultObj.ownerid);
      // $visit.append('<table></table>');
    }

    if (resultObj.pet_name != null) {
      // $visit.append('<tr></tr>');

      $visit.append('<div><h3>' + resultObj.pet_name + '</h3></div>');
      $visit.append('<div><h4>' + resultObj.animal_type + '</h4></div>');
      $visit.append('<div><h4>' + resultObj.color + '</h4></div>');
      if (resultObj.check_in != null) {
        var date = new Date(resultObj.check_in);
        $visit.append('<div><h4>Check In Date: <time>' + date.toDateString() + '</time></h4></div>');

        $visit.append($('<button class="checkOut btn-defult btn-warning">Check Out</button>').data('object', resultObj));
      } else {
        $visit.append($('<button class="checkIn btn-defult btn-success">Check In</button>').data('object', resultObj));
      }
    } else {
      $visit.append('<a href="add_remove.html"><button class="btn-defult btn-primary">Add Pet</button></a>');
    }

    $('.ownersDynamic').last().append($visit);
  });
}

function checkOut(visitObj) {
  console.log(visitObj.visit_id);
  var date = new Date();
  visit.id = visitObj.visit_id;
  visit.checkIn = visitObj.check_in;
  visit.checkOut = date.toDateString();
  visit.pet_id = visitObj.pet_id;

  $.ajax({
    type: 'PUT',
    url: '/checkin_checkout',
    data: visit,
    success: getVisits,
  });
};

function checkIn(petObj) {
  var date = new Date().toDateString();
  var petId = petObj.pets_id;
  sendObject.pet_id = petId;
  sendObject.checkIn = date;

  console.log(sendObject);
  $.ajax({
    type: 'POST',
    url: '/checkin_checkout',
    data: sendObject,
    success: getVisits,
  });
};
