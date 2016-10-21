
/**
 * ChocolateChip-UI Widget - Screen Blocker.
 */
$.extend({

  /**
   * Cover screen:
   */
  Block: opacity => {
    opacity = opacity ? ` style='opacity:${ opacity };'` : ` style='opacity: .5;'`;
    if ($('.mask')[0]) return;
    $('body').append(`<div class='mask'${ opacity }></div>`);
    $('screen.current').attr('aria-hidden', true);
  },

  /**
   * Uncover screen:
   */
  Unblock: () => {
    $('.mask').remove();
    $('screen.current').removeAttr('aria-hidden');
  }
});