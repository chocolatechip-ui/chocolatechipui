
/**
 * Methods to handle color management and coversion.
 */
$.extend({
  /** 
   * Create a color object from provided color value.
   * Handles three values:
   * rgb(255,0,0) -- with or without spaces
   * #ff0000
   * #f00
   * The returned object has two methods:
   * myColor.toHex()
   * myColor.toRGB()
   *
   * @constructor - Must use new keyword
   * @param {string} color - A hex or rgb value.
   * @return {object} ChuiColor
   */
  ChuiColor: function(color) {
    this.ok = false;
    /** 
     * Check for hex color value.
     * String "#" if found.
     */
    if (color.charAt(0) == '#') {
      color = color.substr(1,6);
    }
    color = color.toLowerCase();


    /**
     * Array of color format regex patterns.
     * These will identify the format of the color provided above.
     * The process function converts hex color values into decimal (rgb).
     */
    const colorRegex = [
      {
        /* Example: ['rgb(123, 234, 45)', 'rgb(255, 234, 245)'] */
        re: /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
        process: function(bits) {
          return [
            parseInt(bits[1]),
            parseInt(bits[2]),
            parseInt(bits[3])
          ];
        }
      },
      {
        /* Example: ['#00ff00', '336699'] */
        re: /^(\w{2})(\w{2})(\w{2})$/,
        process: function(bits) {
          return [
            parseInt(bits[1], 16),
            parseInt(bits[2], 16),
            parseInt(bits[3], 16)
          ];
        }
      },
      {
        /**
         * Example: ['#fb0', 'f0f'] 
         */
        re: /^(\w{1})(\w{1})(\w{1})$/,
        process: function(bits) {
          return [
            parseInt(bits[1] + bits[1], 16),
            parseInt(bits[2] + bits[2], 16),
            parseInt(bits[3] + bits[3], 16)
          ];
        }
      }
    ];

    /**
     * Check for a match using each regex. 
     */
    for (let i = 0; i < 3; i++) {
      const re = colorRegex[i].re;
      const processor = colorRegex[i].process;
      const bits = re.exec(color);
      if (bits) {
        const channels = processor(bits);
        this.r = channels[0];
        this.g = channels[1];
        this.b = channels[2];
        this.ok = true;
      }
    }

    /**
     * Validate/cleanup values. 
     */
    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);

    this.toHex = function() {
      let r = this.r.toString(16);
      let g = this.g.toString(16);
      let b = this.b.toString(16);
      if (r.length == 1) r = '0' + r;
      if (g.length == 1) g = '0' + g;
      if (b.length == 1) b = '0' + b;
      return '#' + r + g + b;
    }

    this.toRGB = function() {
      return 'rgb(' + this.r +',' + this.g + ',' + this.b + ')';
    }
  },

  /**
   * Make global method to get brightness of provided color.
   * This is based on the values of YIQ color formula.
   * This method expects a color object created by $.ChuiColor.
   */
  getBrightness: function(color) {
    if ($.type(color) === 'string') color = $.ChuiColor(color);
    return (color.r * .299) + (color.g * .587) + (color.b * .114);           
  },

  /**
   * Function to light a color.
   * Expects a hex value as string and an integer as percent:
   */
  lightenColor: function(color, percent) {  
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    let R = (num >> 16) + amt;
    let G = (num >> 8 & 0x00FF) + amt;
    let B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  },

  /**
   * Function to darken a color.
   * Expects a hex value as string and an integer as percent:
   */
  darkenColor: function(color, percent) {  
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    let R = (num >> 16) - amt;
    let G = (num >> 8 & 0x00FF) - amt;
    let B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  },

  /**
   * Method to calculate color contrast.
   * It expects a hex or rgb value:
   */
  calculateBrightness: function(color) {
    if ($.type(color) === 'object') color = color.toHex();
    const kolor = new $.ChuiColor(color);
    return $.getBrightness(kolor);
  }
});
