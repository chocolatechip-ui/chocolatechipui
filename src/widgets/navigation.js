
/**
 * ChocolateChip-UI Widget - Navigation Module.
 */

$(() => {
  /**
   * Private variable to track navigation state:
   */
  let isNavigating = false;
  /**
   * get screen by id:
   */
  const getScreen = screen => $('#' + screen);

  /**
   * Handle state of screens:
   */
  const makeScreenCurrent = screen => {
    screen = $(screen);
    screen.addClass('current');
    screen.removeClass('previous');
    screen.removeClass('next');
  };
  const makeScreenPrevious = screen => {
    screen = $(screen);
    screen.removeClass('current');
    screen.removeClass('next');
    screen.addClass('previous');
  };
  const makeScreenNext = screen => {
    screen = $(screen);
    screen.removeClass('current');
    screen.removeClass('previous');
    screen.addClass('next');
  };

  $.extend({

    /**
     * Navigate to Specific Article
     */
    GoToScreen: destination => {
      if ($.isNavigating) return;
      $.isNavigating = true;
      setTimeout(function () {
        $.isNavigating = false;
      }, 500);
      $.ChuiRoutes.push(destination);
      const currentScreen = $.screens.getCurrent();
      const destinationScreen = function () {
        let temp = undefined;
        const regex = /:/img;
        temp = regex.test(destination) ? destination.split(':')[0] : destination;
        return getScreen(temp);
      }();
      if (currentScreen[0]) currentScreen[0].scrollTop = 0;
      if (destinationScreen[0]) destinationScreen[0].scrollTop = 0;
      makeScreenPrevious(currentScreen);
      makeScreenCurrent(destinationScreen);
      $.Router.dispatch(destination);
    },

    /**
     * Navigate Back to Previous Article
     */
    GoBack: () => {
      if ($.isNavigating) return;
      $.isNavigating = true;
      const currentScreen = $.screens.getCurrent();
      $.ChuiRoutes.pop();
      const destination = $.ChuiRoutes[$.ChuiRoutes.length - 1];
      const destinationScreen = function () {
        let temp = undefined;
        const regex = /:/img;
        temp = regex.test(destination) ? destination.split(':')[0] : destination;
        return getScreen(temp);
      }();
      if (currentScreen[0]) currentScreen[0].scrollTop = 0;
      if (destinationScreen[0]) destinationScreen[0].scrollTop = 0;
      makeScreenNext(currentScreen);
      makeScreenCurrent(destinationScreen);
      $.Router.dispatch(destination);
      setTimeout(function () {
        $.isNavigating = false;
      }, 500);
    },

    isNavigating: false,

    /**
     * Navigate Back to Non-linear Article
     */
    GoBackToScreen: destination => {
      const position = $.ChuiRoutes.findIndex(function(dest) {
        return dest = destination
      });
      const destinationScreen = getScreen(destination);
      let temp = undefined;
      while ($.ChuiRoutes.length > position + 1) {
        temp = $.ChuiRoutes.pop();
        temp = getScreen(temp);
        makeScreenNext(temp);
      }
      makeScreenCurrent(destinationScreen);
      $.Router.dispatch(destination);
    }
  });

  /**
   * Initialize Back Buttons:
   */
  $('body').on('tap', '.back', function () {
    if (this.hasAttribute('disabled')) return;
    $.GoBack();
  });

  /**
   * Handle navigation events:
   */
  const handleNavigationEvent = element => {
    element = $(element);
    if ($.isNavigating) return;
    if (!element.hazAttr('data-goto')[0]) return;
    if (element.closest('ul').is('.deletable')) return;
    let destination = element.attr('data-goto');
    if (!destination) return;
    element.addClass('selected');
    setTimeout(() => element.removeClass('selected'), 1000);
    /**
     * Handle navigation:
     */
    $.GoToScreen(destination);
  };

  $('body').on('tap', 'li', function () {
    handleNavigationEvent($(this));
  });
  
  $('body').on('doubletap', 'li', function () {
    if (!$.isNavigating) {
      handleNavigationEvent($(this));
    }
  });
});