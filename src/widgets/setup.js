
/**
 * ChocolateChip-UI Widget - Setup.
 */
$(function () {
  if (!/(mobile)|(ios)|(android)/img.test(navigator.userAgent)) {
    $('body').addClass('isDesktop');
  }
  if ($('link[href*=ios]')[0]) {
    $('body').addClass('themeIsiOS');
    $.theme = 'ios';
  } else if ($('link[href*=android]')[0]) {
    $('body').addClass('themeIsAndroid');
    $.theme = 'android';
  }
  $.dir = 'ltr';
  if ($('html').attr('dir') === 'rtl') {
    $.dir = 'rtl'
  }
});