$(function() {
  getOwnersNames();

  $('select').on('change', displayPets);
});

function getOwnersNames () {
  $.ajax({
    type: 'GET',
    url: '/add_remove/owners',
    success: displayOwners
  });
}

function displayOwners(response) {
  response.forEach(function(person) {
    var fullName = person.first_name + ' ' + person.last_name;
    var $option = $('<option value="' + fullName + '">' + fullName + '</value>').data('id', person.id);
    $('#owners_menu').append($option);
  });
}

function displayPets() {
  var $ownerid = $(this).find(':selected').data('id');
  console.log($ownerid);
}
