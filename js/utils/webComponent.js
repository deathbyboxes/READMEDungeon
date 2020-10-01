/*
  * This function will build existing web components (custom or otherwise) using pure javascript
  * and returns the element built.
  * NOTE: for the el parameter you must use an already established element. if you're using a 
  * a custom element, you need to make sure you've created and defined that element first.
  * @param el - the DOM element you wish to create
  * @param attrs - an object listing the attributes you wish to add to the element
  * @param props - properties you wish the element to have that are stored in the element's class 
  * 
  * YOU MUST HAVE THE COMPONENT JS FILE THAT GOES WITH IT
*/
function buildElement(el, attrs = null, props = null) {
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

function renderElements(p, val) {
  Object.keys(this._elements).forEach(el => {
    if(this._elements[el][p] && this._elements[el][p] !== val) {
      this._elements[el][p] = val
      this._elements[el].render();
    }
  });
}

export {buildElement, renderElements}
