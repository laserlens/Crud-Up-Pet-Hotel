$(function() {
  // listeners
  $('.user').on('submit', addNewUser);
});

function addNewUser(event) {
  event.preventDefault();
  var user = $('.user').serialize();
  submitUser(user);
}

function submitUser(person) {

  $.AJAX({
    type: 'POST',
    url: '/newUser',
    data: person,
    success: addRemove
  });
}

function addRemove() {
  $.AJAX({
    type: 'GET',
    url: '/addRemove'
    success: function() {
      console.log('moved to addRemove');
    }
  });
}
