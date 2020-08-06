class TouchIcon extends HTMLElement {
  connectedCallback() {
    if (this._state.type === 'player')
      this.classList.add('player');
    this.setAttribute('locked',this._state.isLocked);
    this.render();
  }

  constructor() {
    super();

    this._state = {
      //filled in when component is created
    }

    //click listener
    this.addEventListener('click', e => {
      //eventually fill info section
      console.log(this.getState);
    });
  }

  set setState(obj) {
    for (let [key, val] of Object.entries(obj)) {
      this._state[key] = val;
    }
  }

  get getState() {
    return this._state;
  }


  render() {
    this.innerHTML = `
      <i class='fas fa-${this._state.iconImg}'></i>
    `
  }
}

// create element
customElements.define('touch-icon', TouchIcon);