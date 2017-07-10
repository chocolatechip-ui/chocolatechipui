export const listComponent = new Component({
  element: "#list",
  render: (data) => html`
    <li>
      <h3>${ data }</h3>
    </li>`
})
