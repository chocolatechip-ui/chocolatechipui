import {h} from '../src/utils/h'

export const musicComponent = new Component({
  element: '#musicList',
  render: (music) => (
    <li>
      <div>
        <h3>{ music.title }</h3>
        <h4>{ music.album }</h4>
        <p>{ music.description }</p>
      </div>
    </li>
  )
})

export const documentsComponent = new Component({
  element: '#docsList',
  render: (doc) => (
    <li class="center-vertical">
      <h3>{ doc.title }</h3>
      <h4>{ doc.subtitle }</h4>
      <aside>
        <span class="counter">{ doc.amount }</span>
      </aside>
    </li>
  )
})

export const recipesComponent = new Component({
  element: '#recipesList',
  render: (recipe) => (
    <li>
      <div>
        <h3>{recipe.name}</h3>
        <h4>Ingredients</h4>
        <Ingredients {...{recipe}} />
        <h4>Directions</h4>
        <Directions {...{recipe}} />
      </div>
    </li>
  )
})

export const favoritesComponent = new Component({
  element: '#favoritesList',
  render: (data) => (
    <li>
      <h3>{ data }</h3>
    </li>
  )
})

/**
 * JSX Sub-Components:
 */
const Ingredients = ({recipe}) => (
  <ul>
    {recipe.ingredients.map(ingredient => <li>{ingredient}</li>)}
  </ul>
)
const Directions = ({recipe}) => (
  <ol>
    { recipe.directions.map(direction => <li>{ direction }</li>)}
  </ol>
)
