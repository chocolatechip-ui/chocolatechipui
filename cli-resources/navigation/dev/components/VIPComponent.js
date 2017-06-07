export const VIPComponent = new Component({
  element: "#navigationList",
  actions: [{
    event: "tap",
    element: "li",
    callback: function() {
      console.log($(this).text());
    }
  }],
  render: (person, idx) => html`
    <li data-goto='detail:${ person.uuid }'>
      <h3>${idx + 1}: ${ person.firstName } ${ person.lastName }</h3>
      <aside>
        <disclosure></disclosure>
      </aside>
    </li>`
})
