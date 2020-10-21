import { login } from '../services/api';

export default class AppContent extends HTMLElement {

  static get observedAttributes() {
    return ['user'];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.shadow.innerHTML = this.render();
  }

  connectedCallback() {
    this.setAttribute('user', false);
    this.shadow.innerHTML = this.render();
    this.header = this.querySelector('custom-header');
  }

  render() {
    return `
      <custom-header></custom-header>
    `
  }


}
