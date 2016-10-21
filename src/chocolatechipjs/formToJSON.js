
/**
 * ChocolateChip-UI - form to JSON.
 */  
$.extend({
  form2JSON(rootNode, delimiter) {
    rootNode = typeof rootNode === 'string' ? $(rootNode)[0] : rootNode;
    delimiter = delimiter || '.';
    const result = {};
    const arrays = {};
    const getFieldValue = function(fieldNode) {
      if (fieldNode.nodeName === 'INPUT') {
        if (fieldNode.type.toLowerCase() === 'radio' || fieldNode.type.toLowerCase() === 'checkbox') {
          if (fieldNode.checked) {
            return fieldNode.value;
          }
        } else {
          if (!fieldNode.type.toLowerCase().match(/button|reset|submit|image/i)) {
            return fieldNode.value;
          }
        }
      } else {
        if (fieldNode.nodeName === 'TEXTAREA') {
          return fieldNode.value;
        } else {
          if (fieldNode.nodeName === 'SELECT') {
            return getSelectedOptionValue(fieldNode);
          }
        }
      }
      return '';
    };
    const getFormValues = rootNode => {
      let result = [];
      let currentNode = rootNode.firstChild;
      while (currentNode) {
        if (currentNode.nodeName.match(/INPUT|SELECT|TEXTAREA/i)) {
          result.push({
            name: currentNode.name,
            value: getFieldValue(currentNode)
          });
        } else {
          let subresult = getFormValues(currentNode);
          result = result.concat(subresult);
        }
        currentNode = currentNode.nextSibling;
      }
      return result;
    };
    const getSelectedOptionValue = selectNode => {
      const multiple = selectNode.multiple;
      if (!multiple) {
        return selectNode.value;
      }
      if (selectNode.selectedIndex > -1) {
        let result = [];
        $('option', selectNode).each(function(idx, item) {
          if (item.selected) {
            result.push(item.value);
          }
        });
        return result;
      }
    };
    const formValues = getFormValues(rootNode);
    formValues.forEach(function(item) {
      const value = item.value;
      if (value !== '') {
        let name = item.name;
        const nameParts = name.split(delimiter);
        let currResult = result;
        for (let j = 0; j < nameParts.length; j++) {
          const namePart = nameParts[j];
          let arrName = undefined;
          if (namePart.indexOf('[]') > -1 && j === nameParts.length - 1) {
            arrName = namePart.substr(0, namePart.indexOf('['));
            if (!currResult[arrName]) {
              currResult[arrName] = [];
            }
            currResult[arrName].push(value);
          } else {
            if (namePart.indexOf('[') > -1) {
              arrName = namePart.substr(0, namePart.indexOf('['));
              const arrIdx = namePart.replace(/^[a-z]+\[|\]$/gi, '');
              if (!arrays[arrName]) {
                arrays[arrName] = {};
              }
              if (!currResult[arrName]) {
                currResult[arrName] = [];
              }
              if (j === nameParts.length - 1) {
                currResult[arrName].push(value);
              } else {
                if (!arrays[arrName][arrIdx]) {
                  currResult[arrName].push({});
                  arrays[arrName][arrIdx] = currResult[arrName][currResult[arrName].length - 1];
                }
              }
              currResult = arrays[arrName][arrIdx];
            } else {
              if (j < nameParts.length - 1) {
                if (!currResult[namePart]) {
                  currResult[namePart] = {};
                }
                currResult = currResult[namePart];
              } else {
                currResult[namePart] = value;
              }
            }
          }
        }
      }
    });
    return result;
  }
});