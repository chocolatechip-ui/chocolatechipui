import * as app from './components/components';
import {aboutSheet} from './controllers/about/aboutSheet';
import {outputHeroImg} from './controllers/heroImage/outputHeroImg';
import {bestWines} from '../data/bestWines';
import {wines} from '../data/californiaWines';
import {wineRoute} from './routes/router';
import {searchPanelInit} from './controllers/search/searchPanelInit';
import {searchPanelControlsSetup} from './controllers/search/searchPanelControlsSetup';
import {searchPanel} from './controllers/search/searchPanelControlsSetup';
import {handleWineSearch} from './controllers/search/handleWineSearch';
import {handlePurchaseProgressBar} from './controllers/purchase/handlePurchaseProgressBar';
import {handlePurchase} from './controllers/purchase/handlePurchase';
import {Router} from './src/widgets/ui-router'
import {UINavigation} from './src/widgets/ui-navigation'
import {UIRange} from './src/widgets/ui-range'
import {purchaseSheet} from './controllers/purchase/handlePurchase'
import {setupPurchaseSheet} from './controllers/purchase/handlePurchase'

$(function() {

  /**
   * Mount imported components:
   */
  const genericRange = new UIRange()
  app.specialRedsComponent.mount();
  app.specialWhitesComponent.mount();
  app.selectedWineComponent.mount();
  app.filteredWinesComponent.mount();
  app.wineryComponent.mount();

  app.specialRedsComponent.render(bestWines[0].data);
  app.specialWhitesComponent.render(bestWines[1].data);

  /**
   * Run imported controllers:
   */
  aboutSheet();
  outputHeroImg();
  searchPanelInit();
  searchPanelControlsSetup();
  handleWineSearch();
  handlePurchaseProgressBar();
  setupPurchaseSheet()
  handlePurchase();

});
