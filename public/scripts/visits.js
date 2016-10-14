var resultArray = [];
$(function () {
  getVisits();
});

function getVisits() {
  $.ajax({
    type: 'GET',
    url: '/checkin_checkout/visits',
    success: appendVisits,
  });
};

function appendVisits(reference) {
  reference.forEach(function (obj) {
    resultArray.push(obj);
  });

  resultArray.sort(function (a, b) {return a.ownerid - b.ownerid;});

  resultArray.forEach(function (obj) {

    var $visit = $('<div class="visit"></div>');
    console.log('Obj ownerid: ', obj.ownerid);
    console.log('Data is: ', $('.ownersDynamic').data('id'));
    if ($('.ownersDynamic').data('id') != obj.ownerid) {
      $('.ownersDynamic').append($('<div><h2>' + obj.first_name + ' ' + obj.last_name + '</h2></div>'));
      $('.ownersDynamic').data('id', obj.ownerid);
      $visit.append('<table></table>');
    }

    console.log($('.ownersDynamic').data('id') != obj.ownerid);

    $visit.append('<tr></tr>');
    $visit.append('<td>' + obj.pet_name + '</td>');
    $visit.append('<td>' + obj.animal_type + '</td>');
    $visit.append('<td>' + obj.color + '</td>');
    if (obj.check_in != null) {
      var date = new Date(obj.check_in);
      $visit.append('<td><time>' + date.toDateString() + '</time></td>');

      $visit.append($('<button class="checkOut">Check Out</button>').data('id', obj.visitsid.toString()));
    } else {
      $visit.append('<button class="checkIn">Check In</button>');
    }

    $('.ownersDynamic').last().append($visit);
  });
}
