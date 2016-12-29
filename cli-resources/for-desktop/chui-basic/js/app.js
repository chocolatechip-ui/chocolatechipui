$(function() {
  var listView = $.View({
    element: "#list",
    template: 
    "<li>\
      <h3>{= data }</h3>\
    </li>"
  });
  listView.render(["One","Two","Three"]);
});