import {todosData} from './data/todosData'
import {todoComponent} from './components/todoComponent'
import {totalsComponent} from './components/totalsComponent'
import {appComponent} from './components/appComponent'
import {todoStateTemplate} from './components/todoStateTemplate'
import {renderActiveTodos} from './controllers/renderActiveTodos'
import {toggleButtonState} from './controllers/toggleButtonState'
import {loadFromLocalStorage} from './controllers/loadFromLocalStorage'
// import './src/box'

$(function() {
  $('nav h1').array[0].removeAttribute('style')

  /**
   * Mount Imported Components:
   */
  appComponent.mount()
  todoComponent.mount()
  totalsComponent.mount()
  window.appComponent = appComponent
  loadFromLocalStorage()
})
