import {selectedWineComponent} from '../components/components'
import {wines} from '../../data/californiaWines'
import {outputHeroImg} from '../controllers/heroImage/outputHeroImg'
import {Router} from '../src/widgets/ui-router'

export const wineRoute = new Router()

/**
 * Define handlers to show select
 * wines from scroll panel:
 */
wineRoute.addRoute({
  route: 'selectedWine',
  callback: (param) => {
    const selectedWine = wines.filter(function(wine) {
      return wine.id === param
    })[0]
    $('#selectWineType').text(selectedWine.type)
    $('#selectedWineVarietal').text(selectedWine.varietal)
    selectedWineComponent.render(selectedWine)
    document.querySelector('#viewWinery').dataset.location = selectedWine.location
    outputHeroImg()
  }
})
