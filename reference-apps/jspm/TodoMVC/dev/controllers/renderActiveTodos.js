import {totalsView} from '../views/totalsView';
import {todoStateTemplate} from '../views/todoStateTemplate';
// Display number of active todos:
//================================
export function renderActiveTodos(data) {
  let active = data.filter(function(item) {
    return item.state === 'active';
  });

  function renderActiveNumber(number, active) {
    totalsView.setTemplate(todoStateTemplate[number]);
    totalsView.render(active);
  }
  active = active.length || 0;
  if (!active ) {
    renderActiveNumber(1, 0);
  } else if (active === 1) {
    renderActiveNumber(0, active);
  } else if (active > 1) {
    renderActiveNumber(1, active);
  }
}