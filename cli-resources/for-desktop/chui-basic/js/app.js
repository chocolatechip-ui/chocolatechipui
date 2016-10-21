$(function() {
  var ListView = $.View({
    element: "#list",
    template: "<li><h3>Item {= data }</h3></li>"
  });
  ListView.render(["One","Two","Three"])
});