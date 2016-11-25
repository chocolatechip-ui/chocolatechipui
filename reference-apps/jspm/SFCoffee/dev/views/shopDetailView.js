export const shopDetailView  = $.View({
  element: '#shopDetail',
  variable: 'choice',
  template: 
  `<li>
    <div>
      <div class='horizontal-panel'>
        <img src="{= choice.image }" alt="{= choice.name }">
        <div>
          <h3>{= choice.name } <a class="offsiteLink" target="_blank" href="{= choice.site }"></a></h3>
          <h4>{= choice.location }</h4>
        </div>
      </div>
      <p>{= choice.content }</p>
    </div>
  </li>`
})