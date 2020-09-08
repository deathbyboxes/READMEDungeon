const isDomEntity = entity => {
  return typeof entity   === 'object' && entity.nodeType !== undefined
}

class InfoPanel extends HTMLElement {
  constructor() {
    super();
    this.isLocked = true;
  }
  render() {
    this.innerHTML = '';
    if(this.isLocked) {
      this.innerHTML = `
        <div class="locked-content">
          <div class="locked-title"><i class="fas fa-lock"></i></div>
          <div class="title">LOCKED</div>
          <div class="sub-title">Complete tasks to unlock</div>
        </div>
      `
    } else {
      if(this.header?.length > 0){
        for (const el of this.header) {
          if(isDomEntity(el))
            this.appendChild(el)
          else 
            this.append(el)
        }
      }
      if(this.body?.length > 0){
        for (const el of this.body) {
          if(isDomEntity(el))
            this.appendChild(el)
          else 
            this.append(el)
        }
      }
      if(this.footer?.length > 0){
        for (const el of this.footer) {
          if(isDomEntity(el))
            this.appendChild(el)
          else 
            this.append(el)
        }
      }
    }
  
    document.querySelector("#info-section").innerHTML = ''

    document.querySelector("#info-section").appendChild(this)
  }

}


customElements.define('info-panel', InfoPanel);