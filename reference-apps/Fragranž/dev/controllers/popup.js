import {UIPopup} from '../src/widgets/ui-popup'

export let popup
export const uipopup = (() => {
  $(() => {
    popup = new UIPopup({
      id: "emptyCart",
      title: 'Warning!',
      message: 'There is nothing in the cart. Please add some items first.',
      continueButton: 'OK',
      callback: $.noop
      })
  })
})()
