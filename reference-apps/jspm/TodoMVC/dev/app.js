import {todosData} from './data/todosData';
import {todoView} from './views/todoView';
import {totalsView} from './views/totalsView';
import {appView} from './views/appView';
import {todoStateTemplate} from './views/todoStateTemplate';
import {renderActiveTodos} from './controllers/renderActiveTodos';
import {toggleButtonState} from './controllers/toggleButtonState';
import {boxSetupAndLoad} from './controllers/boxSetupAndLoad';

$(function() {
  $('nav h1').removeAttr('style');

  /**
   * Init $.Box and load all todos:
   */
  boxSetupAndLoad();

  /**
   * Mount Imported Views:
   */
  appView.mount();
  todoView.mount();
  totalsView.mount();

});
