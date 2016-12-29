export const templates = {
  /**
   * Docs template:
   */
  docs: 
`<li class="center-vertical">
  <h3>{= data.title }</h3>
  <h4>{= data.subtitle }</h4>
  <aside>
    <span class="counter">{= data.amount }</span>
  </aside>
</li>`,
  /**
   * Favorites template:
   */
  favorites: 
`<li>
   <h3>{= data }</h3>
</li> `,
  /**
   * Music template:
   */
  music: 
`<li>
  <div>
    <h3>{= data.title }</h3>
    <h4>{= data.album }</h4>
    <p>{= data.description }</p>
  </div>
</li>`,
  /**
   * Recipes template:
   */
  recipes: 
`<li>
  <div>
    <h3>{= data.name }</h3>
    <h4>Ingredients</h4>
    <ul>
      {{ data.ingredients.forEach(function(ingredient) { }}
        <li>{= ingredient }</li>
      {{ }); }}
    </ul>
    <h4>Directions</h4>
    <ol>
      {{ data.directions.forEach(function(direction) { }}
        <li>{= direction }</li>
      {{ }); }}
    </ol>
  </div>
</li>`
};