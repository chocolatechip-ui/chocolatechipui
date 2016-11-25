export const shopsView = $.View({
  element: '#shop-list',
  variable: 'coffeeshop',
  template:
  `<li data-goto="coffeeShopDetail:{= coffeeshop.id }">
    <img src="{= coffeeshop.image }" alt="{= coffeeshop.name }">
    <div>
      <h3>{= coffeeshop.name }</h3>
      <h4>{= coffeeshop.location }</h4>
      <p>{= coffeeshop.description }</p>
    </div>
    <aside><disclosure></disclosure></aside>
  </li>`
})