import { getJobberById, createApplyment } from '../services/api';
import { userId } from '../services/url';

export default class Buttons extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.announcementId = this.getAttribute('announcementId');
    this.action = this.getAttribute('action');
    this.id = this.getAttribute('id');
    this.color = this.getAttribute('color');
    this.app = document.querySelector('#app');
  }

  onClick() {
    const self = this;
    const button = this.shadowRoot.querySelector('div');
    button.onclick = function() {
      switch (self.action) {
        case 'jobber':
          self.app.innerHTML = '<custom-modal width="800" height="700" backgroundColor="#2A025C"><custom-form type="updateJobber"></custom-form></custom-modal>';
          break;
        case 'recruiter':
          self.app.innerHTML = '<custom-modal width="800" height="700" backgroundColor="#2A025C"><custom-form type="updateRecruiter"></custom-form></custom-modal>';
          break;
        case 'company':
          self.app.innerHTML = '<custom-modal width="800" height="700" backgroundColor="#2A025C"><custom-form type="updateCompany"></custom-form></custom-modal>';
          break;
        case 'announcement':
          self.app.innerHTML = `<custom-modal width="800" height="700" backgroundColor="#2A025C"><custom-form type="updateAnnouncement" id="${this.id}"></custom-form></custom-modal>`;
          break;
      }
    }
  }

  connectedCallback() {
    this.shadow.innerHTML = this.render();
    this.onClick();
  }

  render() {
    return `
        <div>
          <img src='${this.color != 'white' ? './img/icon/pen-solid_color.svg' : './img/icon/pen-solid.svg' }' alt='font-awesome' style='${this.style().icon}'/>
        </div>
    `
  }

  style() {
    const icon = `
      height: 20px;
      width: 20px;
      margin-right: 5px;
      cursor: pointer;
    `

    return {
      icon : icon,
    }
  }

}
