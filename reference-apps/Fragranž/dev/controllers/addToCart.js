import {cartState} from '../data/cartState'
import * as app from '../components/components'

export function addToCart() {
  $('#addToCart').on('tap', function() {
    const fragrance = JSON.parse(this.dataset.fragrance)
    cartState.push(fragrance)
    $.GoTo('cart')
    cartState.orderBy('genre', 'product_title')
    app.cartComponents.render()
    const prices = cartState.pluck('wholesale_price')
    let sum = 0
    prices.map(price => sum += parseFloat(price))
    app.totalItemsComponents.render([cartState.size()])
    app.totalCostComponents.render([$.currency(sum)])
    app.totalPurchaseCostComponents.render([$.currency(sum)])
    $('#backToFragrance').find('span').text(fragrance.product_title)
  })
}
