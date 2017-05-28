import {docs} from './data/docs'
import {favorites} from './data/favorites'
import {music} from './data/music'
import {recipes} from './data/recipes'
import * as components from './components/components'
import {Router} from './src/widgets/ui-router'
import {UITabbar} from './src/widgets/ui-tabbar'

app(() => {

  /**
   * Options for Tab Bar:
   */
  const opts = {
     icons: ["music", "docs", "recipes", "top_rated"],
     labels: ["Music", "Docs", "Recipes", "Favs"],
     selected: 1,
     screens: ["music", "documents", "recipes", "favorites"],
     showIcons: false
  }

  /**
   * Init Tab Bar:
   */
  const myTabbar = new UITabbar(opts)

  /**
   * Mount imported views.
   * See ./dev/views/views.js.
   */
  components.musicComponent.mount()
  components.musicComponent.render(music)

  components.documentsComponent.mount()
  components.documentsComponent.render(docs)

  components.recipesComponent.mount()
  components.recipesComponent.render(recipes)

  components.favoritesComponent.mount()
  components.favoritesComponent.render(favorites)
})
