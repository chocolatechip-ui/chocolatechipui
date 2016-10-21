import {docs} from './data/docs';
import {favorites} from './data/favorites';
import {music} from './data/music';
import {recipes} from './data/recipes';
import * as app from './views/views';

$(() => {

  /**
   * Options for Tab Bar:
   */
  const opts = {
     icons: ["music", "docs", "recipes", "top_rated"],
     labels: ["Music", "Docs", "Recipes", "Favs"],
     selected: 1,
     screens: ["music", "documents", "recipes", "favorites"],
     showIcons: false
  };
  
  /**
   * Init Tab Bar:
   */
  $.MyTabbar = $.TabBar(opts);

  /**
   * Mount imported views.
   * See ./dev/views/views.js.
   */
  app.musicView.mount();
  app.musicView.render(music);

  app.documentsView.mount();
  app.documentsView.render(docs);

  app.recipesView.mount();
  app.recipesView.render(recipes);

  app.favoritesView.mount();
  app.favoritesView.render(favorites); 
});