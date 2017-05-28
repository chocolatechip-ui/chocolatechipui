import {totalsComponent} from '../components/totalsComponent';
import {todoStateTemplate} from '../components/todoStateTemplate';
// Display number of active todos:
//================================
export function renderActiveTodos(data) {
  let active = data.filter(function(item) {
    return item.state === 'active';
  });

  function renderActiveNumber(number, active) {
    totalsComponent.setTemplate(todoStateTemplate[number]);
    totalsComponent.render(active);
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