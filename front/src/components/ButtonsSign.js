export default class ButtonsSign extends HTMLElement {

    constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'open'});
      this.backgroundColor = this.getAttribute('backgroundcolor');
      this.action = this.getAttribute('action');
      this.color = this.getAttribute('color');
      this.src = this.getAttribute('src');
      this.app = document.querySelector('#app');
    }
  
    onClick() {
      const self = this
      const button = this.shadowRoot.querySelector('div');
      button.onclick = function() {
        switch (self.action) {
          case 'jobber':
              self.app.innerHTML = '<custom-modal width="800" height="700" backgroundColor="#2A025C"><custom-form type="jobber"></custom-form></custom-modal>';
            break;
          case 'recruiter':
              self.app.innerHTML = '<custom-modal width="800" height="700" backgroundColor="#2A025C"><custom-form type="recruiter"></custom-form></custom-modal>';
            break;
          case 'company':
              self.app.innerHTML = '<custom-modal width="700" height="400" backgroundColor="#2A025C"><custom-form type="company"></custom-form></custom-modal>';
            break;
        }
      }
    }

    onHover() {
        const button = this.shadowRoot.querySelector('div');const img = this.shadowRoot.querySelector('img');
  
        button.onmouseover = function() {
            img.style.height = '180px';
        }
        button.onmouseleave = function() {
            img.style.height = '150px';
        }

        
    }
  
    connectedCallback() {
      this.shadow.innerHTML = this.render();
      this.onClick();
      this.onHover();
    }
  
    render() {
        return `
            <div style="${this.style().btn}">
                <img src="${this.src}" style="${this.style().img}">
                <h4 style="${this.style().h4}"><slot/></h4>
            </div>
        `
    }
  
    style() {  
        const self = this;

        const btn = `
            height: 100%;
            display: flex;
            flex-direction: row;
            background-color: #42038f;
            align-items: center;
            justify-content: center;
            background-color: ${self.backgroundColor};
            cursor: pointer;
        `

        const h4 = `
            color: ${self.color};
            font-size: 30px;
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            margin: 25px;
        `
        
        const img = `
            height: 150px;
        `

        return {
            btn : btn,
            h4 : h4,
            img : img
        }
    }
  
}
  