
/**
 * Check environment properties.
 */
$.extend($, {
  isiPhone: /iphone/img.test(navigator.userAgent),
  isiPad: /ipad/img.test(navigator.userAgent),
  isiPod: /ipod/img.test(navigator.userAgent),
  isiOS: /ip(hone|od|ad)/img.test(navigator.userAgent),
  isAndroid: (/android/img.test(navigator.userAgent) && !/trident/img.test(navigator.userAgent)),
  isTouchEnabled: !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && 'createTouch' in document,
  isOnline: navigator.onLine,
  isStandalone: navigator.standalone,
  isWebkit: (!/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && /webkit/img.test(navigator.userAgent)),
  isDesktop: (!/mobile/img.test(navigator.userAgent)),
  isSafari: (!/edge/img.test(navigator.userAgent) && !/Chrome/img.test(navigator.userAgent) && /Safari/img.test(navigator.userAgent) && !/android/img.test(navigator.userAgent)),
  isChrome: !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && /Chrome/img.test(navigator.userAgent) && !((/samsung/img.test(navigator.userAgent) || /Galaxy Nexus/img.test(navigator.userAgent) || /HTC/img.test(navigator.userAgent) || /LG/img.test(navigator.userAgent)) && !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && /android/i.test(navigator.userAgent) && /webkit/i.test(navigator.userAgent)),
  isNativeAndroid: ((/samsung/img.test(navigator.userAgent) || /Galaxy Nexus/img.test(navigator.userAgent) || /HTC/img.test(navigator.userAgent) || /LG/img.test(navigator.userAgent)) && !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && /android/i.test(navigator.userAgent) && /webkit/i.test(navigator.userAgent))
});