export const specialRedsView = $.View({
  element: '#picksRed',
  variable: 'wine',
  template: `<li data-goto='selectedWine:{= wine.id }'>
  <div>
    <h3>{= wine.name }</h3>
    <h4>{= wine.winery }</h4>
    <p>{= wine.year }</p>
  </div>
</li>`
})

export const specialWhitesView = $.View({
  element: '#picksWhite',
  variable: 'wine',
  template: `<li data-goto='selectedWine:{= wine.id }'>
  <div>
    <h3>{= wine.name }</h3>
    <h4>{= wine.winery }</h4>
    <p>{= wine.year }</p>
  </div>
</li>`
})

export const selectedWineView = $.View({
  element: '#wineDetail',
  variable: 'wine',
  template: `<li>
  <div>
    <h3>{= wine.name }</h3>
    <h4>Body: {= wine.body }</h4>
    <h4>{= wine.winery }</h4>
    <p>{= wine.description }</p>
  </div>
  <aside class='price'>
    <span>{= wine.price }</span>
  </aside>
</li>`
})

export const filteredWinesView = $.View({
  element: '#filteredWines',
  variable: 'wine',
  template: `<li data-goto='selectedWine:{= wine.id }'>
  <div>
    <h3>{= wine.name }</h3>
    <h4>{= wine.varietal }</h4>
  </div>
  <aside>
    <disclosure></disclosure>
  </aside>
</li>`
})

export const wineryView = $.View({
  element: '#viewWinery',
  noTemplate: true,
  events: [{
    event: 'tap',
    callback: function() {
      var location = $(this).attr('data-location');
      window.location.href= 'http://maps.apple.com/?q=' + location;
    }
  }]
})
