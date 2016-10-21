export const showChosenSearchParameters = function(element, parameters) {
  // Handler to show chosen parameters for wine search:
  if (!parameters) return;
  element.find('.type').html(parameters.type);
  element.find('.body').html(parameters.body);
  element.find('.price').html('$' + parameters.price);
};