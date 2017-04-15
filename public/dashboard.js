$(function() {
  var $container = $('#container');
  var $peashooterInfo = $('#peashooter-info');

  $('.show-info').on('click', function(event) {
    $container.addClass('is-covered');
    $peashooterInfo.addClass('is-open');
  });

  $('#peashooter-info__close').on('click', function(event) {
    event.preventDefault();
    $container.removeClass('is-covered');
    $peashooterInfo.removeClass('is-open');
  });
});