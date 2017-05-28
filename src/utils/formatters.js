
/**
 * ChocolateChip-UI  - Data Formatters.
 */

$.extend({
  /**
   * Format Numbers for Thousands:
   */
  formatNumber(amount, separator, decimal) {
    const sep = separator || ","
    /** 
     * Allow the user to round a float to a whole number: 
     */
    if (decimal === 0) {
      const num = Math.round(amount)
      return Number(num).toString().replace(/(?=(?:\d{3})+$)(?!^)/g, sep)
    }
    if (decimal === undefined) {
      /** 
       * Check if amount is a float: 
       */
      if (typeof amount === 'number' && amount % 1 !== 0) {
        return Number(amount).toString().replace(/\d(?=(\d{3})+\.)/g, '$&' + sep)
        /** 
         * Otherwise treat it as an integer: 
         */
      } else {
        return Number(amount).toString().replace(/(?=(?:\d{3})+$)(?!^)/g, sep)
      }
      /** 
       * If a decimal value was provided, format it to that amount: 
       */
    } else {
      return Number(amount).toFixed(decimal).replace(/\d(?=(\d{3})+\.)/g, '$&' + sep)
    }
  },

  /**
   * Return sum of numbers:
   */
  sum(arr) {
    let ret
    if (Array.isArray(arr) && arr.length) {
      ret = arr
    } else {
      ret = [].slice.apply(arguments)
    }
    return ret.reduce(function(a, b) {
      return a + b
    })
  },

  /**
   * Format currency:
   */
  currency(amount, symbol, separator, decimal) {
    const sym = symbol || "$"
    const sep = separator || ","
    const dec = decimal || 2
    let zero = false
    if (decimal === 0) {
      zero = true
    }
    /* Private function to format amounts: */
    const formatNumber = function(amount, sep) {
      /**
       * A decimal value of '0' means we need to round the amount off before adding in thousands separators:
       */
      if (zero) {
        const num = Math.round(amount)
        return Number(num).toString().replace(/^0+/, '').replace(/(?=(?:\d{3})+$)(?!^)/g, sep)
      } else {
        /**
         * Otherwise, we can just add the thousands separators with the decimal placement provided by the user or the default:
         */
        return Number(amount).toFixed(dec).replace(/^0+/, '').replace(/\d(?=(\d{3})+\.)/g, '$&' + sep)
      }
    }
    return sym + formatNumber(amount, sep)
  },

  /**
   * Format Time:
   */
  formatTime(time) {
    const temp = time.split(':')
    const temp2 = temp[0] + ':' + temp[1]
    const ampm = time.split(' ')[1]
    return temp2 + ' ' + ampm
  },

  sortDate(date1, date2) {
    return new Date(date1) - new Date(date2)
  },

  /**
   * Sort Numbers:
   */
  sortNumbers(a, b) {
    return a - b
  },

  sortNumbersDescending(a, b) {
    return b - a
  }
})
