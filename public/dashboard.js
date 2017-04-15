$(function() {
  var $container = $('#container');
  var $peashooterInfo = $('#peashooter-info');

  $('.show-info').on('click', function(event) {
    $container.addClass('is-covered');
    $peashooterInfo.addClass('is-open');
  });
});