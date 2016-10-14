$(function() {
  // listeners
  $('.user').on('submit', addNewUser);
});

function addNewUser(event) {
  event.preventDefault();
  var user = $('.user').serialize();
  console.log(user);
  submitUser(user);
}

function submitUser(person) {

  $.ajax({
    type: 'POST',
    url: '/newUser',
    data: person,
    success: addRemove
  });
}

function addRemove() {
  $.ajax({
    type: 'GET',
    url: '/addRemove',
    success: function() {
      console.log('moved to addRemove');
    }
  });
}
