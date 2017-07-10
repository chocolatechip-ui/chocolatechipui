
/**
 * Paging control.
 * const options = {
 *   element: selector,
 *   screen: '#main',
 *   data: collection[],
 *   size: 3
 * }
 */
import {Router} from './ui-router'
import {UINavigation} from './ui-navigation'
import '../utils/chunk'
export class UIPaging {
  constructor(options) {
    if (!options) return
    const pagingControls = `
      <div class="pager" id='paging-controls'>
        <button class="previous" id='paging-previous' disabled>
          <svg width="24px" height="36px" viewBox="0 0 24 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pagination-icons" stroke="#979797"><path d="M19.7729197,3 L4.25431067,17.8699971 L19.7729196,32.9558941" id="page-previous"></path></g></g></svg>
        </button>
        <button class="next" id='paging-next'>
          <svg width="24px" height="36px" viewBox="0 0 24 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pagination-icons" stroke="#979797"><path d="M4.08862955,3.06871359 L20.0261609,18.0528447 L4.08862956,32.9999994" id="page-next"></path></g></g></svg>
        </button>
      </div>`;
    const settings = {}
    $.extend(settings, options)
    const screen = $(settings.screen);
    screen.find('nav').append(pagingControls)
    const chunks = $.chunk(settings.data, settings.size)

    /**
     * Setup buttons for paging.
     */
    $(() => {
      $('#paging-next').on($.eventStart, function() {
        if (this.disabled) return
        const currPage = document.querySelector('article.current')
        if (!currPage) return
        const nextPage = currPage.nextElementSibling
        if (nextPage && nextPage.className === 'next') {
          currPage.classList.add('previous')
          currPage.classList.remove('current')
          nextPage.classList.add('current')
          nextPage.classList.remove('next')
          document.getElementById('paging-previous').removeAttribute('disabled')
          if (!nextPage.nextElementSibling || !nextPage.nextElementSibling.classList.contains('next')) {
            this.disabled = true
          }
        }
      })
      $('#paging-previous').on($.eventStart, function() {
        if (this.disabled) return
        const currPage = document.querySelector('article.current')
        if (!currPage) return
        const nextPage = currPage.previousElementSibling
        if (nextPage && nextPage.className === 'previous') {
          currPage.classList.add('next')
          currPage.classList.remove('current')
          nextPage.classList.add('current')
          nextPage.classList.remove('previous')
          document.getElementById('paging-next').removeAttribute('disabled')
          if (!nextPage.previousElementSibling || !nextPage.previousElementSibling.classList.contains('previous')) {
            this.disabled = true
          }
        }
      })

    })

    this.render = function() {
      let temp = ''
      if (Array.isArray(chunks)) {

        temp = settings.render(chunks)

      } else {
        return
      }
      const root = $(settings.screen).find('section')
      root.empty()
      root.append(temp)
    }

  }
}
