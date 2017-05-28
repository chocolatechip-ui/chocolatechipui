import * as app from '../components/components'

export function placeOrder() {
  $('#placeOrder').on('tap', () => {
    $.GoTo('confirmation')
    app.totalPurchasedItemsComponents.render()
    function confirmationNumber() {
      let d = Date.now()
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
      const randomLetter = charset[Math.floor(Math.random() * charset.length)]
      return randomLetter + 'xx-xxxx-xxx'.replace(/[xy]/g, (c) => {
        let r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
    }
    $.publish('confirmation-number', confirmationNumber())
  })
}
