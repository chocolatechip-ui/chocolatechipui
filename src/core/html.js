
function html(literals, ...vars) {
  let raw = literals.raw
  let result = ''
  let i = 1
  let len = arguments.length
  let variable
  let str
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

  while (i < len) {
    str = raw[i - 1]
    /**
     * Allow safe html by prefixing interpolation with an exclamation mark.
     */
    safe = str[str.length - 1] === '!'
    variable = normalize(vars[i -1], safe)
    if (safe) str = str.slice(0, -1)
    result += str + variable
    i++
  }


  // Take care of last literal section.
  result += raw[raw.length - 1]

  return result
}
