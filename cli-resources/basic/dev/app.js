import {listComponent} from './components/listComponent'
import {numbers} from './data/numbers'

app(() => {

  /**
   * Because the view is imported, we need to mount it so that it can find its target element:
   */
  listComponent.mount()
  listComponent.render(numbers)

})