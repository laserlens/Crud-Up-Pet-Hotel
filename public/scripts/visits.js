var resultArray = [];
$(function () {
  getVisits();
});

function getVisits() {
  $.ajax({
    type: 'GET',
    url: '/checkin_checkout/visits',
    success: appendVisits(data),
  });
};

function appendVisits(data) {
  data.forEach(function (obj) {
    resultArray.push(obj);
  });

  result.sort(function (a, b) {return a.ownerid - b.ownerid;});

  resultArray.forEach(function (obj) {
    var $visit = $('<div class="visit"></div>');
    if ($('.ownersDynamic').last().data('id') != obj.ownerid) {
      $('.ownersDynamic').append($('<div>' + obj.first_name + ' ' + obj.last_name + '</div>').data('id', obj.ownerid));
    }

    $visit.append('<table></table>');
    $visit.append('<tr></tr>');
    $visit.append('<td>' + obj.pet_name + '</td>');
    $visit.append('<td>' + obj.animal_type + '</td>');
    $visit.append('<td>' + obj.color + '</td>');
    if (obj.check_in != NULL) {
      $visit.append('<td>' + obj.check_in + '</td>');
      $visit.append($('<button class="checkOut">Check Out</button>').data('id', obj.visitsid));
    } else {
      $visit.append('<button class="checkIn">Check In</button>');
    }
  });
}
