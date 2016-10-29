
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
        let temp = undefined;
        let id = undefined;
        if (route.match(/\:/)) {
          temp = route.split(':');
          id = temp[1];
          route = temp[0];
        }
        $.send(route);
      },

      pushRoute: route => $.ChuiRoutes.push(route),

      popRoute: () => $.ChuiRoutes.pop(),

      unshiftRoute: route => $.ChuiRoutes.unshift(route),

      shiftRoute: () => $.ChuiRoutes.shift(),

      insert: (position, route) => {
        if ($.ChuiRoutes.length >= position) {
          $.ChuiRoutes.push(route);
        } else {
          $.ChuiRoutes.splice(position, 0, route);
        }
      },

      eq: function eq(number) {
        if ($.ChuiRoutes.length && number < 0) {
          return $.ChuiRoutes[$.ChuiRoutes.length - 1];
        } else if ($.ChuiRoutes.length && !isNaN(number) && number > -1) {
          return $.ChuiRoutes[number];
        }
      },

      indexOf: route => $.ChuiRoutes.indexOf(route),

      remove: (route, baseRouteOnly) => {
        if (baseRouteOnly) {
          const index = $.ChuiRoutes.indexOf(route);
          $.ChuiRoutes.splice(index, 1);

        } else {
          $.ChuiRoutes.forEach(r => {
            if (r && route === r.split(':')[0]) {
              const index = $.ChuiRoutes.indexOf(r);
              $.ChuiRoutes.splice(index, 1);
            }
          });
        }
      },

      mount: function() {
        if ($('screen').size() && !$.ChuiRoutes.length) {
          $.ChuiRoutes.push($('screen')[0].id);
        }
      }
    };
  }
});

$.extend($.Router, {
  dispatch: route => {
    if (!route) return;
    let temp = undefined;
    let id = undefined;
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