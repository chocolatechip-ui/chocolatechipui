
/**
 * ChocolateChip-UI Widget - Center Elements.
 */
$.fn.extend({
  /**
   * Center an Element on Screen
   */
  center: function(position) {
    if (!this[0]) return;
    const $this = $(this);
    const parent = $this.parent();
    if (position) {
      $(this.css('position', position));
    } else if ($this.css('position') === 'absolute') {
      position = 'absolute';
    } else {
      position = 'relative';
    }
    let height;
    let width;
    let parentHeight;
    let parentWidth;
    if (position === 'absolute') {
      height = $this[0].clientHeight;
      width = $this[0].clientWidth;
      parentHeight = parent[0].clientHeight;
      parentWidth = parent[0].clientWidth;
    } else {
      height = parseInt($this.css('height'), 10);
      width = parseInt($this.css('width'), 10);
      parentHeight = parseInt(parent.css('height'), 10);
      parentWidth = parseInt(parent.css('width'), 10);
      $(this).css({
        'margin-left': 'auto',
        'margin-right': 'auto'
      });
    }
    let tmpTop;
    let tmpLeft;
    if (parent[0].nodeName === 'body') {
      tmpTop = ((window.innerHeight / 2) + window.pageYOffset) - height / 2 + 'px';
      tmpLeft = ((window.innerWidth / 2) - (width / 2) + 'px');
    } else {
      tmpTop = (parentHeight / 2) - (height / 2) + 'px';
      tmpLeft = (parentWidth / 2) - (width / 2) + 'px';
    }
    if (position !== 'absolute') tmpLeft = 0;
    $this.css({
      left: tmpLeft,
      top: tmpTop
    });
    return $this;
  }
});