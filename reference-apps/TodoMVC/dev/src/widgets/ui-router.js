
$.extend({
  ChuiRoutes: []
})
export class Router {
  constructor() {}

  addRoute(...options) {
    options.forEach(item => $.subscribe(item.route, item.callback));
  }
}

$.extend(Router, {
  dispatch: route => {
    if (!route) return
    let temp
    let id
    if (route.match(/\:/)) {
      temp = route.split(':')
      id = temp[1]
      route = temp[0]
    }
    $.publish(route, id)
  }
})

$.extend($.ChuiRoutes, {
  getFullRoute: function getFullRoute() {
    return this.join('/')
  }
})

$(() => {
  if ($('ui-screen').array.length && !$.ChuiRoutes.length) {
    $.ChuiRoutes.push($('ui-screen').array[0].id)
  }
})
