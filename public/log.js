$(function() {
  var socket = io();
  var $log = $('#log');
  var $clear = $('#clear');

  $log.html($('#default-log').html());

  /**
   * Inital load
   */
  $.ajax({ url: '/list', }).done(function(entries) {

    if (entries.length === 0) {
      return;
    }

    $log.html('');

    for (var i = 0; i < entries.length; i++) {
      addEntry(entries[i]);
    }

    // scroll to element from url
    var $selectedElement = $(window.location.hash);
  
    if ($selectedElement.length > 0 && $log.has($selectedElement)) {
      $selectedElement.goTo();
    }
  });

  /**
   * add new lines on "entry"
   */
  socket.on('entry', function(entry) {
    if ($log.find('pre').length > 0) {
      $log.html('');
    }

    addEntry(entry, true);
  });

  /**
   * Remove entries on "clear"
   */
  socket.on('clear', function(data) {
    $log.html($('#default-log').html());
  });

  /**
   * Show error on "error"
   */
  socket.on('error', function(data)  {
    var error = data.error;

    addEntry({
      id: 'Error',
      text: error.replace('Error:', '').trim(),
      error: true
    }, true);
  });

  /**
   * Trigger clear
   */
  $('#clear button').on('click', function(event) {
    event.preventDefault();
    if ($clear.hasClass('clear--confirming')) {
      $clear.removeClass('clear--confirming');
      $.ajax({
        url: '/clear',
        type: 'POST',
      });
    }
    else {
      $clear.addClass('clear--confirming');
    }
  });

  $('#clear .clear__cancel').on('click', function(event) {
    $clear.removeClass('clear--confirming');
  });

  $('body').click(function(event) {
    if ($(event.target).closest('#clear').length === 0) {
      $clear.removeClass('clear--confirming');
    }
  });


  /**
   * Function to add in new entries
   */
  function addEntry(entry, isNew) {
    var id = (entry.id || '');
    var entryHTML = '<a id="'+id+'" href="#'+id+'" class="entry'+(!!isNew ? ' entry--new' : '')+(!!entry.error ? ' entry--error' : '')+'">'+
      '<div class="entry__row">'+
        '<div class="entry__id">'+id+'</div>'+
        '<div class="entry__text">'+entry.text+'</div>'+
      '</div>'+
      ( entry.created_at ? '<div class="entry__timestamp">'+entry.created_at+'</div>' : '' )
    '</a>';
  
    $log.prepend(entryHTML);
    if (isNew) {
      $('.entry.entry--new').each(function(index, el) {
        $el = $(el);
        $el.css({
            'margin-top': -$el.outerHeight(),
            'opacity': 0
          })
          .removeClass('entry--new')
          .animate({
            'margin-top': 0,
            'opacity': 1
          }, 250);
      });
    } 
  }
});

/**
 * Add goTo function for scrolling to div
 */
(function($) {
  $.fn.goTo = function() {
    $('html, body').animate({
      scrollTop: $(this).offset().top + 'px'
    }, 'fast');
    return this; // for chaining...
  }
})(jQuery);