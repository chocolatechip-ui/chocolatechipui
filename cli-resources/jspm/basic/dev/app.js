import {listView} from './views/ListView';
import {numbers} from './data/numbers';
$(() => {

  /**
   * Reset the view's element.
   * Cannot get element when imported, because this happens before DOM ready.
   */
  listView.setElement("#list");
  listView.render(numbers)

});