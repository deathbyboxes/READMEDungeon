/*
  * This function will build web components (custom or otherwise) using pure javascript
  * and returns the element built.
  * @param el - the DOM element you wish to create
  * @param attrs - an object listing the attributes you wish to add to the element
  * @param props - properties you wish the element to have that are stored in the element's class 
*/
export default function buildElement(el, attrs, props) {
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
