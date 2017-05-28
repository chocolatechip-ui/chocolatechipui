export default (function() {

/**
 * Enable capitalize of strings.
 * Adding a second, truthy parameter capitalizes all words in phrase.
 */
$.extend({
  camelize: function(string) {
    if (typeof string !== 'string')
      return;
    return string.replace(/\-(.)/g, function(match, letter) {
      return letter.toUpperCase();
    });
  }
})

})()
