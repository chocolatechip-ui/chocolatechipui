import {listView} from './views/listView';
import {numbers} from './data/numbers';

$(() => {

  /**
   * Because the view is imported, we need to mount it so that it can find its target element:
   */
  listView.mount();
  listView.render(numbers);

});