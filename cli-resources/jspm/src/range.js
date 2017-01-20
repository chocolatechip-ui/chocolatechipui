export default (function() {

/**
 * ChocolateChip-UI Widget - Range Input.
 */
$.fn.extend({
  /**
   * Setup a range input:
   */
  Range: function() {
    if (this[0].nodeName !== 'INPUT') return;
    let input = $(this);
    let newPlace = undefined;
    const width = input.width();
    const newPoint = (input.val() - input.attr("min")) / (input.attr("max") - input.attr("min"));
    let offset = -1.3;
    if (newPoint < 0) {
      newPlace = 0;
    } else if (newPoint > 1) {
      newPlace = width;
    } else {
      newPlace = width * newPoint + offset;
      offset -= newPoint;
    }
    if ($.theme === 'android') {
      input.css({
        'background-size': Math.round(newPlace) + 'px 3px, 100% 3px'
      });
    } else {
      input.css({
        'background-size': Math.round(newPlace) + 'px 10px'
      });
    }
  }
});
$(() => {
  $('input[type=range]').forEach(ctx => {
    $(ctx).Range();
  });
  $('body').on('input', 'input[type=range]', function() {
    $(this).Range();
  });
});
})();