export const fragranceGenresView = $.View({
  element: '#fragranceGenres',
  template: 
  `<li class='nav' data-goto='fragranceList:{= data }'>
    <h3>{= data }</h3>
    <aside>
      <disclosure></disclosure>
    </aside>
  </li>`
});

export const availableFragrancesView = $.View({
  element: '#availableFragrances',
  variable: 'fragrance',
  template: 
  `<li data-goto='detail:{= fragrance.sku }'>
    <img width='60' src='{= fragrance.img_prev }'>
    <div>
      <h3 class='productTitle'>{= fragrance.product_title }</h3>
      <h4>{= fragrance.sku }</h4>
      <h4>{= fragrance.short_description }</h4>
    </div>
    <aside class='price'>
      <span>\${= fragrance.wholesale_price }</span>
      <info></info>
    </aside>
  </li>`
})

export const fragrancesGenreTitleView = $.View({
  element: '#fragrancesGenreTitle',
  variable: 'title',
  template: `{= title }`
});

export const fragranceDetailView = $.View({
  element: '#fragranceDetail',
  variable: 'chosenFragrance',
  template: 
  `<li>
    <img src="{= chosenFragrance.img_prev }">
    <div>
      <h3 class="productTitle">{= chosenFragrance.product_title }</h3>
      <h4><span class="sku">SKU: {= chosenFragrance.sku }</span></h4>
      <h4 class="counter flush">\${= chosenFragrance.wholesale_price }</h4>
      <p class="longDescription">{= chosenFragrance.long_description }</p>
    </div>
  </li>`
});

export const detailTitleView = $.View({
  element: '#detailTitle',
  variable: 'title',
  template: `{= title }`
});

export const cartView = $.View({
  element: '#purchaseItems',
  variable: 'item',
  template: 
  `<li>
    <div>
      <h3>{= item.product_title }</h3>
      <h4>SKU: {= item.sku }</h4>
    </div>
    <aside class='price'><span>Price: {= $.currency(item.wholesale_price) }</span></aside>
  </li>`
});

export const totalItemsView = $.View({
  element: '#totalItems',
  variable: 'total',
  template: `{= total }`
});

export const totalCostView = $.View({
  element: '#totalCost',
  variable: 'total',
  template: `{= total }`
});

export const totalPurchasedItemsView = $.View({
  element: '#purchaseDetails',
  variable: 'item',
  template: 
  `<li>
    <h3><span>{= item.genre }</span>: {= item.product_title }</h3>
  </li>`
});

export const totalPurchaseCostView = $.View({
  element: '#confirmTotalCost',
  variable: 'cost',
  template: `{= cost }`
});




