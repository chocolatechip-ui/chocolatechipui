
/**
 * ChocolateChip-UI Widget - Segmented Buttons.
 */
$(() => {
  $.extend({
    /**
     * Setup a segmented button:
     */
    Segmented: function(options) {
      if (!options || !options.element) return;
      /**
        options = {
          element: '#segmentHolder'
          labels : ['first','second','third'],
          selected: 0,
          callback: function() { alert('Boring!'); }
        }
      */
      let settings = {
        selected: 0,
        callback: $.noop
      };
      $.extend(settings, options);

      let segmented = undefined;
      const labels = (settings.labels) ? settings.labels : [];
      let __selection = undefined;
      let __element = settings.element;

      function createSegmentedButton() {
        let androidSelectionIndicator = '';
        if ($.theme = 'android') {
          androidSelectionIndicator = '<span class="androidSelectionBorder"></span>';
        }
        let __segmented = ['<div class="segmented">'];
        labels.forEach(function(ctx, idx) {
          if (settings.selected === idx) {
            __segmented.push('<button role="radio" aria-checked="true" class="selected">');
            __selection = idx;
          } else {
            __segmented.push('<button role="radio">');
          }

          __segmented.push(ctx);
          __segmented.push('</button>');
        });
        __segmented.push(androidSelectionIndicator + '</div>');
        segmented = __segmented.join('');
        $(settings.element).append(segmented);


      }
      createSegmentedButton();

      /**
       * For Android Material Design:
       */
      let androidSelectionBorder = undefined;
      if ($.theme === 'android') {
        androidSelectionBorder = $(__element).find('.androidSelectionBorder');
        let selectedButton = $(__element).find('button').eq(settings.selected);
        let width = selectedButton.width();
        let left = selectedButton.offset().left -16;
        if ($.dir === 'rtl') {
          left = selectedButton.offset().left +16;
        }
        androidSelectionBorder.css({width: width + 'px', left: left + 'px'});
      }

      const callback = settings.callback;
      $(__element).on('tap', '.segmented > button', function(e) {
        let $this = $(this);
        if (this.parentNode.classList.contains('paging')) return;
        $this.siblings('button').removeClass('selected');
        $this.siblings('button').removeAttr('aria-checked');
        $this.addClass('selected');
        __selection = $this.index();
        __element = $(this);
        $this.attr('aria-checked', true);
        callback.call(this, e);

        /**
         * For Android Material Design:
         */
        if ($.theme === 'android') {
          let width = $this.width();
          let left = $this.offset().left -16;
          if ($.dir === 'rtl') {
            left = $this.offset().left +16;
          }
          androidSelectionBorder.css({width: width + 'px', left: left + 'px'});
        }
      });

      return {
        val: function() {
          return {
            index: __selection,
            element: __element
          }
        },
        getSelection: function() {
          return {
            index: __selection,
            element: __element
          }
        }
      }
    }
  });
});