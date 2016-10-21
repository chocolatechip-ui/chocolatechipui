
/**
 * ChocolateChip-UI string methods.
 */
$.extend({
  camelize: string => {
    if (typeof string !== 'string')
      return;
    return string.replace(/\-(.)/g, (match, letter) => {
      return letter.toUpperCase();
    });
  },

  deCamelize: string => {
    if (typeof string !== 'string')
      return;
    return string.replace(/([A-Z])/g, '-$1').toLowerCase();
  },

  capitalize: (string, all) => {
    const self = this;
    if (!string) {
      return;
    }
    if (typeof string !== 'string')
      return;
    if (all) {
      const str = string.split(' ');
      let newstr = [];
      str.forEach(item => {
        return newstr.push(self.capitalize(item));
      });
      return newstr.join(' ');
    } else {
      return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    }
  }
});