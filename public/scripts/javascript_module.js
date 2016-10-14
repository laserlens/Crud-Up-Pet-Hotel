function highlightEmpty(event) {
  var isValid = true;
  $('input[type="text"]').each(function() {
    if ($.trim($(this).val()) == '') {
      isValid = false;
      $(this).css({
        'border': '1px solid red',
        'background': '#FFCECE'
      });
    } else {
      $(this).css({
        'border': '',
        'background': ''
        });
    }
  });
    if (isValid == false) {
      e.preventDefault();
    }
});
