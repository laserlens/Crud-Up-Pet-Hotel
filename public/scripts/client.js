$(function() {
  // listeners
  $('.user').on('submit', addNewUser);
  $('.addPet').on('submit', addPet);
});

function addNewUser(event) {
  event.preventDefault();
  var user = $('.user').serialize();
  submitUser(user);
}

function submitUser(person) {
  $.ajax({
    type: 'POST',
    url: '/newUser',
    data: person,
    success: window.location.href = "/views/add_remove.html"
  });
}

function addPet(event) {
  event.preventDefault();
  var pet = $('.addPet').serialize();
  console.log(pet);
  submitPet(pet);
}

function submitPet(pet) {
  $.ajax({
    type: 'POST',
    url: '/add_remove',
    data: pet,
    success: petAdded
  });
}

alert('Your pet was added');
