export const musicComponent = new Component({
  element: '#musicList',
  render: (music) => html`
    <li>
      <div>
        <h3>${ music.title }</h3>
        <h4>${ music.album }</h4>
        <p>${ music.description }</p>
      </div>
    </li>`
})

export const documentsComponent = new Component({
  element: '#docsList',
  render: (doc) => html`
    <li class="center-vertical">
      <h3>${ doc.title }</h3>
      <h4>${ doc.subtitle }</h4>
      <aside>
        <span class="counter">${ doc.amount }</span>
      </aside>
    </li>`
})

export const recipesComponent = new Component({
  element: '#recipesList',
  render: (recipe) => html`
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
})

export const favoritesComponent = new Component({
  element: '#favoritesList',
  render: (data) => html`
    <li>
      <h3>${ data }</h3>
    </li>`
})
