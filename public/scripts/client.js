$(function () {
  $('.user').on('submit', addUserToDB);
});

function addUserToDB(event) {
  event.preventDefault();
  var user = $('.user').serialize();
  $.AJAX({
    type: 'POST',
    url: ''
  });
}
