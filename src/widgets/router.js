
/**
 * ChocolateChip-UI Widget - Router.
 */
$.extend({
  /**
   * Define Router:
   */
  ChuiRoutes: [],

  Router: () => {

    return {
      addRoute: options => {
        if ($.type(options) === 'array') {
          options.forEach(item => $.on(item.route, item.callback));
        }
      },

      getFullRoute: () => $.ChuiRoutes.join('/'),

      getCurrentLoc: () => {
        const temp = this.getFullRoute().split('/');
        return temp[temp.length - 1];
      },

      dispatch: route => {
        let temp;
        let id;
        if (route.match(/\:/)) {
          temp = route.split(':');
          id = temp[1];
          route = temp[0];
        }
        $.send(route);
      }
    };
  }
});

$.extend($.Router, {
  dispatch: route => {
    if (!route) return;
    let temp;
    let id;
    if (route.match(/\:/)) {
      temp = route.split(':');
      id = temp[1];
      route = temp[0];
    }
    $.send(route, id)
  }
});

$.extend($.ChuiRoutes, {
  getFullRoute: function getFullRoute() {
    return this.join('/');
  }
});

$(() => {
  /**
   * Set up initial route:
   */
  if ($('screen').size() && !$.ChuiRoutes.length) {
    $.ChuiRoutes.push($('screen')[0].id);
  }
});