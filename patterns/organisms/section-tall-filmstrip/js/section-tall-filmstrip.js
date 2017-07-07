(function (Drupal, $, window) {

  // Execute code once the window is fully loaded.
  $(window).load(function () {
    $(".js-expandable-container__toggle").unbind('click').bind('click', function(e) { // expandable card
      // Must be attached to anchor element to prevent bubbling.
      e.preventDefault();
      e.stopPropagation();
      $(this).parent(".js-expandable-container").addClass('is-open');
    });
  });

} (Drupal, jQuery, this));
