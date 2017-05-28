export const shopDetailComponents  = new Component({
  element: '#shopDetail',
  render: (choice) => html`
  <li>
    <div>
      <div class='horizontal-panel'>
        <img src="${ choice.image }" alt="${ choice.name }">
        <div>
          <h3>${ choice.name }</h3>
          <h4>${ choice.location }</h4>
        </div>
      </div>
      <p>${ choice.content }</p>
    </div>
  </li>`
})
