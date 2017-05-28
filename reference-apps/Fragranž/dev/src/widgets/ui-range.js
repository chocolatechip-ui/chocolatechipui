
export class UIRange {
  constructor(range) {
    function _range(input) {
      if (!input || input.nodeName !== 'INPUT') return
      let newPlace
      const width = input.clientWidth
      const newPoint = (input.value - input.getAttribute("min")) / (input.getAttribute("max") - input.getAttribute("min"))
      let offset = -1.3
      if (newPoint < 0) {
        newPlace = 0
      } else if (newPoint > 1) {
        newPlace = width
      } else {
        newPlace = width * newPoint + offset
        offset -= newPoint
      }
      if ($.theme  && $.theme === 'android') {
        $(input).css({
          'background-size': Math.round(newPlace) + 'px 3px, 100% 3px'
        })
      } else {
        $(input).css({
          'background-size': Math.round(newPlace) + 'px 10px'
        })
      }
    }
    setTimeout(() => {
      const ranges = $('input[type=range]')
      if (ranges.array.length) {
        ranges.array.forEach(ctx => {
          _range(ctx)
        })
      }
    })
    $('body').on('input', 'input[type=range]', function() {
      _range(this)
    })
    if (range) {
      $(() => {
        _range(range)
      })
    }
  }
}
