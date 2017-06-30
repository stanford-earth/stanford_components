(function (Drupal, $, window) {

  // Execute code once the window is fully loaded.
  $(window).load(function () {
    $(".js-expandable-card__toggle").unbind('click').bind('click', function(e) { // expandable card
      // Must be attached to anchor element to prevent bubbling.
      e.preventDefault();
      $(this).parent(".js-expandable-card").toggleClass('is-open').siblings(".js-expandable-card").toggleClass('is-hidden');
      $(".js-section-expandable-banner").toggleClass('has-overlay');
    });
  });

} (Drupal, jQuery, this));
