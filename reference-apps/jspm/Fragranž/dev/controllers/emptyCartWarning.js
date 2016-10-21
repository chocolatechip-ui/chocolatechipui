export function emptyCartWarning() {
  // Popup for empty cart:
  //======================
  $.Popup({
    id: "emptyCart",
    title: 'Warning!', 
    message: 'There is nothing in the cart. Please add some items first.', 
    continueButton: 'OK'
  });
}