class PlayerMenu extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    if (!this.isOpen) {
      let menuIconCount = document.querySelectorAll('.menu-item').length;
      this.style.top = `-${menuIconCount * 50}px`;
    } else {
      this.style.top = '0';
    }

    //change open state
    this.isOpen = !this.isOpen;
  }
}

customElements.define('player-menu', PlayerMenu);