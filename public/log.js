$(function() {
  var socket = io();
  var $log = $('#log');
  var $clear = $('#clear');
  
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
  });
})(jQuery);