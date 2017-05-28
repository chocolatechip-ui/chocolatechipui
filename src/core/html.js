
function html(literals) {
  let raw = literals.raw
  let result = ''
  let i
  let len
  let sub
  let lit
  let safe

  /**
   * Function that normalizes interpolation substitions.
   * It flattens arrays while ignoring falsey values.
   * All other values are converted to strings.
   */
  function normalize (val, safe) {
    return (
      val == null ? ''
      : val === false ? ''
      : Array.isArray(val) ? val.map(normalize).join('')
      : safe === false ? $.escapeHTML(val)
      : String(val)
    )
  }

  for (i = 1, len = arguments.length; i < len; i++) {
    lit = raw[i - 1]
    /**
     * Allow safe html by prefixing interpolation with an exclamation mark.
     */
    safe = lit[lit.length - 1] === '!'
    sub = normalize(arguments[i], safe)
    if (safe) lit = lit.slice(0, -1)

    result += lit + sub
  }

  // Take care of last literal section.
  result += raw[raw.length - 1]

  return result
}
