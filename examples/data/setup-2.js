$(function() {

  /**
   * Options for Tab Bar:
   */
  var opts = {
     icons: ["music", "pictures", "docs", "recipes", "more"],
     labels: ["Music", "Pictures", "Docs", "Recipes", "More"],
     selected: 1,
     screens: ['music', 'pictures', 'documents', 'recipes', 'fruits'],
     showIcons: false
  }

  /**
   * Init Tab Bar:
   */
  var myTabbar = new UITabbar(opts)

  /**
   * Music Component:
   */
  var musicComponent = new Component({
    element: '#musicList',
    render: function(music) {
      return html`
        <li>
          <img  data-src="${ music.image }" height="80px">
          <div>
            <h3>${ music.title }</h3>
            <h4>${ music.album }</h4>
            <p>${ music.description }</p>
          </div>
        </li>`
    }
  })
  musicComponent.render(music)

  /**
   * Image Grid Component:
   */
  var imageGridComponent = new Component({
    element: '#gridOfImages',
    render: function(image) {
      return html`
        <img class="col" src="${ image }">`
    }
  })
  imageGridComponent.render(imageCollection)

  /**
   * Docs Component:
   */
  var docsComponent = new Component({
    element: '#docsList',
    render: function(doc) {
      return html`
        <li class='center-vertical'>
          <h3>${ doc.title }</h3>
          <h4>${ doc.subtitle }</h4>
          <aside>
            <span class='counter'>${ doc.amount }</span>
          </aside>
        </li>`
    }
  })
  docsComponent.render(docs)

  /**
   * Recipes Component:
   */
  var recipesComponent = new Component({
    element: '#recipesList',
    render: function(recipe) {
      return html`
         <li>
          <div>
            <h3>${ recipe.name }</h3>
            <h4>Ingredients</h4>
            <ul>${ recipe.ingredients.map(ingredient => html`<li>!${ ingredient }</li>`)}
            </ul>
            <h4>Directions</h4>
            <ol>
              ${ recipe.directions.map(direction => html`<li>!${ direction }</li>`)}
            </ol>
          </div>
        </li>`
    }
  })
  recipesComponent.render(recipes)

  /**
   * Favorites Component:
   */
  var fruitsComponent = new Component({
    element: '#fruitsList',
    render: function(fruit) {
      return html`
        <li class='center-vertical' data-goto='chosenFruit:${ fruit.type }'>
          <div>
            <h3>${ fruit.name }</h3>
          </div>
          <aside>
            <disclosure></disclosure>
          </aside>
        </li>`
    }
  })
  fruitsComponent.render(fruits)

})
