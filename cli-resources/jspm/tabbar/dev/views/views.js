export const musicView = $.View({
  element: '#musicList',
  variable: 'music',
  template: `<li>
  <div>
    <h3>{= music.title }</h3>
    <h4>{= music.album }</h4>
    <p>{= music.description }</p>
  </div>
</li>`
});

export const documentsView = $.View({
  element: '#docsList',
  variable: 'doc',
  template: `<li class="center-vertical">
  <h3>{= doc.title }</h3>
  <h4>{= doc.subtitle }</h4>
  <aside>
    <span class="counter">{= doc.amount }</span>
  </aside>
</li>`
});

export const recipesView = $.View({
  element: '#recipesList',
  variable: 'recipe',
  template: `<li>
  <div>
    <h3>{= recipe.name }</h3>
    <h4>Ingredients</h4>
    <ul>
      {{ recipe.ingredients.forEach(function(ingredient) { }}
        <li>{= ingredient }</li>
      {{ }); }}
    </ul>
    <h4>Directions</h4>
    <ol>
      {{ recipe.directions.forEach(function(direction) { }}
        <li>{= direction }</li>
      {{ }); }}
    </ol>
  </div>
</li>`
});

export const favoritesView = $.View({
  element: '#favoritesList',
  template: `<li>
  <h3>{= data }</h3>
</li> `
});