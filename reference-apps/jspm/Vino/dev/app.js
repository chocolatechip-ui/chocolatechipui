import * as app from './views/views';
import {aboutSheet} from './controllers/about/aboutSheet';
import {outputHeroImg} from './controllers/heroImage/outputHeroImg';
import {bestWines} from '../data/bestWines';
import {wines} from '../data/californiaWines';
import {wineRoute} from './routes/router';
import {searchPanelInit} from './controllers/search/searchPanelInit';
import {searchPanelControlsSetup} from './controllers/search/searchPanelControlsSetup';
import {handleWineSearch} from './controllers/search/handleWineSearch';
import {handlePurchaseProgressBar} from './controllers/purchase/handlePurchaseProgressBar';
import {handlePurchase} from './controllers/purchase/handlePurchase';

$(function() {

  // Mount imported views:
  //======================
  app.specialRedsView.mount();
  app.specialWhitesView.mount();
  app.selectedWineView.mount();
  app.filteredWinesView.mount();
  app.wineryView.mount();

  // Mount imported router:
  //=======================
  wineRoute.mount();

  app.specialRedsView.render(bestWines[0].data);
  app.specialWhitesView.render(bestWines[1].data);

  // Mount imported controllers:
  //============================
  aboutSheet();
  outputHeroImg();
  searchPanelInit();
  searchPanelControlsSetup();
  handleWineSearch();
  handlePurchaseProgressBar();
  handlePurchase();
  
});