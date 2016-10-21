// Show todos by state:
//=====================
export function toggleButtonState(elem) {
  if (!elem) return;
  $(elem).siblings().removeClass('selected');
  $(elem).addClass('selected');
}