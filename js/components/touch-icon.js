export default class TouchIcon extends HTMLElement {
  connectedCallback() {
    if (this.icon === 'user')
      this.classList.add('player');
    else
      this.setAttribute('locked',this.isLocked);
    
    this.render();
  }

  constructor() {
    super();

    //click listener
    this.addEventListener('click', e => {
      //eventually fill info section
      if (this.icon === 'user') {
        //display user action options
      } else {
        document.querySelector('.icon').classList.remove('active');
        if (!this.isLocked)
          this.classList.add('active');
      }
      console.log(this.name);
    });
  }

  render() {
    this.innerHTML = `
      <i class='fas fa-${this.icon}'></i>
    `
  }
}

// create element
customElements.define('touch-icon', TouchIcon);