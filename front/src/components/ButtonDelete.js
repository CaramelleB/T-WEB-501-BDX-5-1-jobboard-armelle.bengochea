export default class ButtonsDelete extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.id = this.getAttribute('id');
    this.action = this.getAttribute('action');
    this.color = this.getAttribute('color');
    this.app = document.querySelector('#app');
  }

  onClick() {
    const self = this;
    const button = this.shadowRoot.querySelector('div');
    button.onclick = function() {
      self.app.innerHTML = `
      <custom-modal width="700" height="400" backgroundColor="#2A025C">
        <div style="${self.style().div}">
          <h3 style="${self.style().h5}">Are you sure you want to delete this ${self.action} ?</h3>
          <custom-btn
            action="confirmDelete${self.action}"
            id="${self.id}"
            color="white">Confirm
          </custom-btn>
        </div>
      </custom-modal>
      `;
    }
  }

  connectedCallback() {
    this.shadow.innerHTML = this.render();
    this.onClick();
  }

  render() {
    return `
        <div>
          <img src='${this.color != 'white' ? './img/icon/trash-alt-solid_color.svg' : './img/icon/trash-alt-solid.svg' }' alt='font-awesome' style='${this.style().icon}'/></div>
        </div>
    `
  }

  style() {

    const div = `
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      width: 100%;
      place-items: center;
      text-align: -webkit-center;
    `

    const icon = `
      height: 20px;
      width: 20px;
      margin-right: 5px;
      cursor: pointer;
    `

    const action2 = `
      margin: 30px;
      flex-wrap: wrap;
      display: flex;
      justify-content: space-between;
      width: 300px;
    `

    const h5 = `
      font-size: 30px;
      font-family: 'Roboto', sans-serif;
      font-weight: 700;
      margin: 25px;
      color: white;
    `

    return {
      div : div,
      icon : icon,
      action2 : action2,
      h5 : h5
    }
  }

}
