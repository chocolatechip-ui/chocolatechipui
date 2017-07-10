import {h} from '../src/utils/h'
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

export const templates = {
  /**
   * Docs template:
   */
  docs: (doc) => (
    <li class="center-vertical">
      <h3>{ doc.title }</h3>
      <h4>{ doc.subtitle }</h4>
      <aside>
        <span class="counter">{ doc.amount }</span>
      </aside>
    </li>
  ),
  /**
   * Favorites template:
   */
  favorites: (favorite) => (
    <li>
      <h3>{ favorite }</h3>
    </li>
  ),
  /**
   * Music template:
   */
  music: (music) => (
    <li>
      <div>
        <h3>{ music.title }</h3>
        <h4>{ music.album }</h4>
        <p>{ music.description }</p>
      </div>
    </li>
  ),
  /**
   * Recipes template:
   */
  recipes: (recipe) => (
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
}
