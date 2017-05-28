export const templates = {
  /**
   * Docs template:
   */
  docs: (doc) => html`
    <li class="center-vertical">
      <h3>${ doc.title }</h3>
      <h4>${ doc.subtitle }</h4>
      <aside>
        <span class="counter">${ doc.amount }</span>
      </aside>
    </li>`,
  /**
   * Favorites template:
   */
  favorites: (favorite) => html`
    <li>
      <h3>${ favorite }</h3>
    </li> `,
  /**
   * Music template:
   */
  music: (music) => html`
    <li>
      <div>
        <h3>${ music.title }</h3>
        <h4>${ music.album }</h4>
        <p>${ music.description }</p>
      </div>
    </li>`,
  /**
   * Recipes template:
   */
  recipes: (recipe) => html`
    <li>
      <div>
        <h3>${ recipe.name }</h3>
        <h4>Ingredients</h4>
        <ul>
          ${ recipe.ingredients.map(ingredient => `<li>${ ingredient }</li>`)}
        </ul>
        <h4>Directions</h4>
        <ol>
          ${ recipe.directions.map(direction => `<li>${ direction }</li>`)}
        </ol>
      </div>
    </li>` 
}