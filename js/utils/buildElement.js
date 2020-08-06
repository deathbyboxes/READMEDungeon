export function buildElement(el, attrs, props) {
  let element = document.createElement(el);
  if (attrs)
    for (let [attr, val] of Object.entries(attrs)) {
      let attribute = document.createAttribute(attr);
      attribute.value = val;
      element.setAttributeNode(attribute);
    }
  if (props)
    for (let [prop, val] of Object.entries(props)) {
      element[prop] = val;
    }

  return element;
}
