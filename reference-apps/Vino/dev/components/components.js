export const specialRedsComponent = new Component({
  element: '#picksRed',
  render: (wine) => html`
  <li data-goto='selectedWine:${ wine.id }'>
    <div>
      <h3>${ wine.name }</h3>
      <h4>${ wine.winery }</h4>
      <p>${ wine.year }</p>
    </div>
  </li>`
})

export const specialWhitesComponent = new Component({
  element: '#picksWhite',
  render:  (wine) => html`
  <li data-goto='selectedWine:${ wine.id }'>
    <div>
      <h3>${ wine.name }</h3>
      <h4>${ wine.winery }</h4>
      <p>${ wine.year }</p>
    </div>
  </li>`
})

export const selectedWineComponent = new Component({
  element: '#wineDetail',
  render:  (wine) => html`
  <li>
    <div>
      <h3>${ wine.name }</h3>
      <h4>Body: ${ wine.body }</h4>
      <h4>${ wine.winery }</h4>
      <p>${ wine.description }</p>
    </div>
    <aside class='price'>
      <span>${ wine.price }</span>
    </aside>
  </li>`
})

export const filteredWinesComponent = new Component({
  element: '#filteredWines',
  render:  (wine) => html`
  <li data-goto='selectedWine:${ wine.id }'>
    <div>
      <h3>${ wine.name }</h3>
      <h4>${ wine.varietal }</h4>
    </div>
    <aside>
      <disclosure></disclosure>
    </aside>
  </li>`
})

export const wineryComponent = new Component({
  element: '#viewWinery',
  actions: [{
    event: 'tap',
    callback: function() {
      var location = this.dataset.location
      window.location.href= 'http://maps.apple.com/?q=' + location
    }
  }]
})
