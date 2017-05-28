// Show todos by state:
//=====================
export function toggleButtonState(elem) {
  if (!elem) return
  const siblings =  $(elem).siblings()
  if (siblings && siblings.array && siblings.array.length) {
    $(elem).siblings().forEach(el => el.classList.remove('selected'))
    $(elem).array[0].classList.add('selected')
  }
}
