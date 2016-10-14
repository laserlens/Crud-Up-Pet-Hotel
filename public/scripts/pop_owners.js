$(function() {
  getOwnersNames();
  $('#owners_menu').on('change', getPets);
  $('#pets_menu').on('change', displayPetInfo);
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
    var $option = $('<option value="' + person.id + '">' + fullName + '</value>');
    $('#owners_menu').append($option);
  });
}

function getPets() {
  var $ownerid = $(this).find(':selected').attr('value');
    appendPetDisplay('', '', '');
  $.ajax({
    type: 'POST',
    url: '/add_remove/pets',
    data: {'id': $ownerid},
    success: displayPets
  });
}

function displayPets(response) {
  $('#pets_menu').empty();
  $('#pets_menu').append($('<option></option>'));
  response.forEach(function(pet) {
    var name = pet.pet_name;
    var id = pet.owners_id;
    var $option = $('<option value="' + id + '">' + name + '</value>').data(pet);
    $('#pets_menu').append($option);
  });
}

function displayPetInfo() {
  var petObj = $(this).find(':selected').data();
  var name = petObj.pet_name;
  var type = petObj.animal_type;
  var color = petObj.color;
  appendPetDisplay(name, type, color);
}

function appendPetDisplay (name, type, color) {
  $('#pet_name').val(name);
  $('#animal_type').val(type);
  $('#color').val(color);
}
