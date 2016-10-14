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
  $.ajax({
    type: 'POST',
    url: '/newUser',
    data: person,
    success: window.location.href = '/views/add_remove.html'
  });
}
