
export class UISegmented {
  constructor(options) {
    if (!options || !options.element) return
    const self = this
    let settings = {
      selected: 0,
      callback: $.noop
    }
    $.extend(settings, options)

    this.button
    let segmented
    const labels = (settings.labels) ? settings.labels : []
    this.index
    this.element = settings.element

    function createSegmentedButton() {
      let androidSelectionIndicator = ''
      if ($.theme = 'android') {
        androidSelectionIndicator = '<span class="androidSelectionBorder"></span>'
      }
      let __segmented = ['<ui-segmented>']
      labels.forEach(function(ctx, idx) {
        if (settings.selected === idx) {
          __segmented.push('<button role="radio" aria-checked="true" class="selected">')
          self.index = idx
        } else {
          __segmented.push('<button role="radio">')
        }

        __segmented.push(ctx)
        __segmented.push('</button>')
      })
      __segmented.push(androidSelectionIndicator + '</ui-segmented>')
      segmented = __segmented.join('')
      $(settings.element).append(segmented)
      self.button = $(settings.element).find('button').eq(settings.selected).array[0]



    }
    createSegmentedButton()

    /**
     * For Android Material Design:
     */
    let androidSelectionBorder
    if ($.theme === 'android') {
      androidSelectionBorder = $(this.element).find('.androidSelectionBorder')
      let selectedButton = $(this.element).find('button').eq(settings.selected)
      let width = selectedButton.array[0].clientWidth
      let left = selectedButton.array[0].offsetLeft
      androidSelectionBorder.css({width: width + 'px', left: left + 'px'})
    }

    const callback = settings.callback
    $(this.element).on('tap', 'ui-segmented > button', function(e) {
      if (this.parentNode.classList.contains('paging')) return
      $(this).siblings('button').array.map(btn => btn.classList.remove('selected'))
      $(this).siblings('button').array.map(btn => btn.removeAttribute('aria-checked'))
      this.classList.add('selected')
      self.index = $(this).index()
      self.button = this
      this.setAttribute('aria-checked', true)
      callback.call(this, e)

      /**
       * For Android Material Design:
       */
      if ($.theme === 'android') {
        let width = this.clientWidth
        let left = this.offsetLeft
        if (document.dir === 'rtl') {
          left = this.offsetLeft
        }
        androidSelectionBorder.css({width: width + 'px', left: left + 'px'})
      }
    })
  }
}
