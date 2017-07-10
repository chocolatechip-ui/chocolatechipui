
const sanitized = {}
/** 
 * Convert JSX into a sanitized HTML string for Component render function. 
 */
export function h(name, attrs) {
  const emptyTags = [
    'area',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ]
  
  const map = {'&':'amp', '<':'lt', '>':'gt', '"':'quot', "'":'apos'}
  const DOMAttributeNames = {
    className: 'class',
    htmlFor: 'for'
  }

  /* Escape attributes. */
  const esc = str => String(str).replace(/[&<>"']/g, s => `&${map[s]};`)
  
	const stack = []
	for (let i = arguments.length; i-- > 2; ) {
		stack.push(arguments[i])
	}

	/* Enable nested jsx tag support. */
	if (typeof name === 'function') {
		(attrs || (attrs = {})).children = stack.reverse()
		return name(attrs)
	}

	let s = `<${ name }`
	if (attrs) for (let i in attrs) {
		if (attrs[i] !== false && attrs[i] != null) {
			s += ` ${DOMAttributeNames[i] ? DOMAttributeNames[i] : esc(i)} = "${ esc(attrs[i]) }"`
		}
	}

	if (emptyTags.indexOf(name) === -1) {
		s += '>'

		while (stack.length) {
			let child = stack.pop()
			if (child) {
				if (child.pop) {
					for (let i = child.length; i--; ) stack.push(child[i])
				}
				else {
					s += sanitized[child] === true ? child : esc(child)
				}
			}
		}

		s += `</${ name }>`
	} else {
		s += '>'
	}

	sanitized[s] = true
	return s
}
