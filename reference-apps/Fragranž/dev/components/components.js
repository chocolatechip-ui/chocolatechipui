import '../src/utils/formatters'
export const fragranceGenresComponents = new Component({
  element: '#fragranceGenres',
  render: (data) => html`
  <li class='nav' data-goto='fragranceList:${ data }'>
    <h3>${ data }</h3>
    <aside>
      <disclosure></disclosure>
    </aside>
  </li>`
})

export const availableFragrancesComponents = new Component({
  element: '#availableFragrances',
  render: (fragrance) => html`
  <li data-goto='detail:${ fragrance.sku }'>
    <img width='60' src='${ fragrance.img_prev }'>
    <div>
      <h3 class='productTitle'>${ fragrance.product_title }</h3>
      <h4>${ fragrance.sku }</h4>
      <h4>${ fragrance.short_description }</h4>
    </div>
    <aside class='price'>
      <span>$${ fragrance.wholesale_price }</span>
      <info></info>
    </aside>
  </li>`
})

export const fragrancesGenreTitleComponents = new Component({
  element: '#fragrancesGenreTitle',
  render: (title) => html`${ title }`
})

export const fragranceDetailComponents = new Component({
  element: '#fragranceDetail',
  render: (chosenFragrance) => html`
  <li>
    <img src="${ chosenFragrance.img_prev }">
    <div>
      <h3 class="productTitle">${ chosenFragrance.product_title }</h3>
      <h4><span class="sku">SKU: ${ chosenFragrance.sku }</span></h4>
      <h4 class="counter flush">$${ chosenFragrance.wholesale_price }</h4>
      <p class="longDescription">${ chosenFragrance.long_description }</p>
    </div>
  </li>`
})

export const detailTitleComponents = new Component({
  element: '#detailTitle',
  render: (title) => html`${ title }`
})

export const cartComponents = new Component({
  element: '#purchaseItems',
  render: (item) => html`
  <li>
    <div>
      <h3>${ item.product_title }</h3>
      <h4>SKU: ${ item.sku }</h4>
    </div>
    <aside class='price'><span>Price: ${ $.currency(item.wholesale_price) }</span></aside>
  </li>`
})

export const totalItemsComponents = new Component({
  element: '#totalItems',
  render: (total) => html`${ total }`
})

export const totalCostComponents = new Component({
  element: '#totalCost',
  render: (total) => html`${ total }`
})

export const totalPurchasedItemsComponents = new Component({
  element: '#purchaseDetails',
  render: (item) => html`
  <li>
    <h3><span>${ item.genre }</span>: ${ item.product_title }</h3>
  </li>`
})

export const totalPurchaseCostComponents = new Component({
  element: '#confirmTotalCost',
  render: (cost) => html`${ cost }`
})

export const confirmationNumberComponent = new Component({
  element: '#confirmationNum',
  render: (number) => html`${ number }`
})




