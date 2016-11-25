export const chosenPersonView = $.View({
  element: "#chosenPersonList",
  template: 
  `<li>
    <h3>First Name: {= data.firstName }</h3>
  </li>
  <li>
    <h3>Last Name: {= data.lastName }</h3>
  </li>`
})