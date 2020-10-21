export default class ModalCard extends HTMLElement {

    constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'open'});
    }
  
    connectedCallback() {
      this.shadow.innerHTML = this.render();
    }
  
    render() {
        return `
            <custom-modal width="800" height="700" backgroundColor="#2A025C"><custom-form type="jobber"></custom-form></custom-modal>
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
  