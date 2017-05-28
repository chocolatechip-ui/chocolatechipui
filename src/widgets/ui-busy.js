
class UIBusy {
  constructor(options) {
    if (!options) return
    let settings = {
      size: 40,
      color: '#666',
    }
    $.extend(settings, options)
    const element = $(settings.element)

    let spinner
    /**
     * For iOS:
     */
    const iOSBusy = () => {
      let small
      /**
       * Smaller busy indicator (less tines):
       */
      if (parseInt(settings.size, 10) < 30) {
        spinner = `<svg class='chui-busy small' width='${ settings.size }px' height='${ settings.size }px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'>
        <g x='0' y='0' width='100' height='100' fill='none' class='bk'>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(0 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(45 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(90 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(135 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(180 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(225 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(270 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(315 50 50) translate(0 -30)'></rect>
        </g>
      </svg>`
        element.append(spinner)
      /**
       * Larger busy indicator (more tines)
       */
      } else {
        spinner = `<svg class='chui-busy' width='${ settings.size }px' height='${ settings.size }px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' class='uil-default'>
        <g x='0' y='0' width='100' height='100' fill='none'>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(0 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(30 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(60 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(90 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(120 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(150 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(180 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(210 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(240 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(270 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(300 50 50) translate(0 -30)'></rect>
          <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='${ settings.color }' transform='rotate(330 50 50) translate(0 -30)'></rect>
        </g>
      </svg>`
        element.append(spinner)
      }
    }

    /**
     * For Android:
     */
    const androidBusy = () => {
      settings.id = $.uuid()
      let androidActivityIndicator = null
      if ($.isNativeAndroid) {
        androidActivityIndicator = `<svg class="chui-busy" version="1.1" id="${ settings.id }" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
        <g>
          <path fill="none" stroke="${ settings.color }" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M74.2,65c2.7-4.4,4.3-9.5,4.3-15c0-15.7-12.8-28.5-28.5-28.5S21.5,34.3,21.5,50c0,5.5,1.6,10.6,4.3,15"/>
        </g>
        <polyline fill="none" stroke="${ settings.color }" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="89.4,56.1 74.3,65 65.4,49.9 "/>
      </svg>`

        element.append(androidActivityIndicator)
        return
      } else {
        androidActivityIndicator = `<svg id="${ settings.id }" class="chui-busy" x="0px" y="0px" viewBox="0 0 100 100"><circle stroke="url(#SVGID_1_)" cx="50" cy="50" r="28.5"/></svg>`
        element.append(androidActivityIndicator)
        element.array[0].classList.add('hasActivityIndicator')
        if (options.color) {
          $('#' + settings.id).find('circle').css('stroke', options.color)
        }
      }
      $('#' + settings.id).css({
        'height': settings.size + 'px',
        'width': settings.size + 'px'
      })
    }

    /**
     * Create Busy control for appropriate OS:
     */
    if ($.theme === 'android') {
      androidBusy(options)
    } else if ($.theme === 'ios') {
      iOSBusy(options)
    }

    this.center = function(position) {
      if (!element) return
      const busy = element.find('.chui-busy')
      const parent = element.array[0]
      if (position) {
        busy.css('position', position)
      } else {
        position = busy.css('position')
      }
      let height
      let width
      let parentHeight
      let parentWidth
      if (position === 'absolute') {
        busy.css('position', 'absolute')
        height = busy.array[0].clientHeight
        width = busy.array[0].clientWidth
        parentHeight = parent.clientHeight
        parentWidth = parent.clientWidth
      } else {
        height = parseInt(busy.css('height'), 10)
        width = parseInt(busy.css('width'), 10)
        parentHeight = parseInt($(parent).css('height'), 10)
        parentWidth = parseInt(($(parent)).css('width'), 10)
        $(busy).css({
          'margin-left': 'auto',
          'margin-right': 'auto'
        })
      }
      let tmpTop
      let tmpLeft
      if (parent.nodeName === 'body') {
        tmpTop = ((window.innerHeight / 2) + window.pageYOffset) - height / 2 + 'px'
        tmpLeft = ((window.innerWidth / 2) - (width / 2) + 'px')
      } else {
        tmpTop = (parentHeight / 2) - (height / 2) + 'px'
        tmpLeft = (parentWidth / 2) - (width / 2) + 'px'
      }
      if (position !== 'absolute') tmpLeft = 0
      busy.css({
        left: tmpLeft,
        top: tmpTop
      })
      return busy
    }

  }
}
