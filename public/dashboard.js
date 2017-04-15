$(function() {
  var $container = $('#container');
  var $peashooterInfo = $('#peashooter-info');

  $('.show-info').on('click', function(event) {
    $container.addClass('is-covered');
    $peashooterInfo.addClass('is-open');
    linkToTab($(this).attr('href'));
  });

  $('.navigation li a').on('click', function(event) {
    linkToTab($(this).attr('href'));
  });


  $('#peashooter-info__close').on('click', function(event) {
    event.preventDefault();
    $container.removeClass('is-covered');
    $peashooterInfo.removeClass('is-open');
  });

  function linkToTab(target) {
    var $link = $('.navigation [href="'+target+'"]');
    var $target = $(target);

    if ($target.length > 0) {
      $('.tabs .tab, .navigation li a').removeClass('is-active');
      $link.addClass('is-active');
      $target.addClass('is-active');
    }
  }
});