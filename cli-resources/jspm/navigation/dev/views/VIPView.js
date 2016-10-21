export const VIPView = $.View({
  element: "#arrayTemplate1",
  startIndexFrom: 1,
  events: [{
    event: "tap",
    element: "li",
    callback: function() {
      console.log($(this).text());
    }
  }],
  template: `<li data-goto='detail:{= data.guid }'>
    <h3>{= $.view.index }: {= data.firstName } {= data.lastName }</h3>
    <aside>
      <disclosure></disclosure>
    </aside>
  </li>`
})