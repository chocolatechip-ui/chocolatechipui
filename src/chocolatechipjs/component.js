
/**
 * ChocolateChip-UI - Component Factory.
 */
$.extend({
  Component: options => {
    const comp = $.Component;
    $[options.name] = () => {
      comp.options = options;
      delete comp.options.name
      return $.View(comp.options);
    };
  }
});