
export const showChosenSearchParameters = function(element, parameters) {
  // Handler to show chosen parameters for wine search:
  if (!parameters) return
  element.find('.type').array[0].innerHTML = parameters.type
  element.find('.body').array[0].innerHTML = parameters.body
  element.find('.price').array[0].innerHTML = '$' + parameters.price
}
