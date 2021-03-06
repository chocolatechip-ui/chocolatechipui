import './validators'
export default (function() {

/**
 * ChocolateChip-UI - Form Validation & JSON.
 */
$.extend({
  /**
   * Setup Form object to convert data to JSON, and to validate form values:
   */
  Form: options => {
    if (!options || $.type(options) !== 'array') return

    let __passed = false
    let __errors = []
    let __result = []

    /** 
     * Helper to validate form elements: 
     */
    function validateElement(item) {
      if (!item) return
      if (!__passed) {
        __errors.push({
          element: item.element,
          type: item.type
        })
        if (item.callback) item.callback()
      } else {
        convertToObject($(item.element).array[0].getAttribute('name'), $(item.element).array[0].value)
      }
    }

    /** 
     * Helper to convert form element names to JSON: 
     */
    function convertToObject(name, value) {
      __result.push({
        name: name,
        value: value
      })
    }

    /** 
     * Convert form names and values to JSON: 
     */
    function convertObjectToJSON(data) {
      const delimiter = '_'
      let result = {}
      let arrays = {}
      data.forEach(item => {
        const value = item.value
        if (value !== '') {
          if (!item.name) return
          let name = item.name
          let nameParts = name.split(delimiter)
          let currResult = result
          for (let j = 0; j < nameParts.length; j++) {
            const namePart = nameParts[j]
            let arrName
            if (namePart.indexOf('[]') > -1 && j === nameParts.length - 1) {

              arrName = namePart.substr(0, namePart.indexOf('['))
              if (!currResult[arrName]) {
                currResult[arrName] = []
              }
              currResult[arrName].push(value)
            } else {
              if (namePart.indexOf('[') > -1) {
                arrName = namePart.substr(0, namePart.indexOf('['))
                const arrIdx = namePart.replace(/^[a-z]+\[|\]$/gi, '')
                if (!arrays[arrName]) {
                  arrays[arrName] = {}
                }
                if (!currResult[arrName]) {
                  currResult[arrName] = []
                }
                if (j === nameParts.length - 1) {
                  currResult[arrName].push(value)
                } else {
                  if (!arrays[arrName][arrIdx]) {
                    currResult[arrName].push({})
                    arrays[arrName][arrIdx] = currResult[arrName][currResult[arrName].length - 1]
                  }
                }
                currResult = arrays[arrName][arrIdx]
              } else {
                if (j < nameParts.length - 1) {
                  if (!currResult[namePart]) {
                    currResult[namePart] = {}
                  }
                  currResult = currResult[namePart]
                } else {
                  currResult[namePart] = value
                }
              }
            }
          }
        }
      })
      return result
    }

    /** 
     * Validate form elements: 
     */
    options.forEach(item => {
      if (!$(item.element)[0]) return
      let inputs
      if (!item.type) {
        convertToObject($(item.element).attr('name'), $(item.element).val())
        return
      }
      switch (item.type) {
        case 'notempty':
          __passed = $(item.element).isNotEmpty()
          validateElement(item)
          break
        case 'number':
          __passed = $(item.element).validateNumber()
          validateElement(item)
          break
        case 'text':
          __passed = $(item.element).validateText()
          validateElement(item)
          break
        case 'alphanumeric':
          __passed = $(item.element).validateAlphaNumeric()
          validateElement(item)
          break
        case 'username':
          __passed = $(item.element).validateUserName(item.min)
          validateElement(item)
          break
        case 'email':
          __passed = $(item.element).validateEmail()
          validateElement(item)
          break
        case 'phone':
          __passed = $(item.element).validatePhoneNumber()
          validateElement(item)
          break
        case 'url':
          __passed = $(item.element).validateUrl()
          validateElement(item)
          break
        case 'age':
          __passed = $(item.element).validateAge(item.min)
          validateElement(item)
          break
        case 'checkbox':
          __passed = $(item.element).validateCheckbox()
          if (__passed) {
            validateElement(item)
          }
          break
        case 'radio':
          __passed = $(item.element).validateRadioButtons()
          validateElement(item)
          break
        case 'selectbox':
          __passed = $(item.element).validateSelectBox()
          validateElement(item)
          break
        case 'password':
          __passed = $.validatePassword(item.element, item.element2, item.min)
          __errors.push({
            element: item.element,
            element2: item.element2,
            type: item.type
          })
          if (__passed) {
            validateElement(item)
          }
          break
        case 'switch':
          __passed = $(item.element).validateSwitch()
          if (__passed) {
            validateElement(item)
          }
          break
        case 'selectlist':
          __passed = $(item.element).validateSelectList()
          if (__passed) {
            inputs
            inputs = $(item.element).find('input').forEach(function(item) {
              if (item.checked) {
                convertToObject(item.name, item.value)
              }
            })
            
          }
          break
        case 'multiselectlist':
          __passed = $(item.element).validateMultiSelectList()
          inputs
          if (__passed) {
            inputs = $(item.element).find('input[type=checkbox]')
            inputs.forEach(item => {
              if (item.checked) {
                convertToObject(item.name, item.value)
              }
            })
          }
          break
      }
      if (item.type.match(/custom/)) { 
        const cv = $.customValidators.filter(validator => {
          return (validator.name) === item.type
        })
        if (cv) {
          const result = $.validateWithRegex(item.element, cv[0].regex)
          if (result) {
            const el = $(item.element)
            convertToObject(el[0].name, el[0].value)
          } else {
            __errors.push({
              element: item.element,
              type: item.type
            })
            if (item.callback) item.callback()
          }
        }
      }
    })



    return {
      getErrors() {
        if (__errors.length) {
          return __errors
        }
      },

      errors() {
        if (__errors.length) {
          return true
        }
      },

      get() {
        return convertObjectToJSON(__result)
      }
    }
  }
})

})()
