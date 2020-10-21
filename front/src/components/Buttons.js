import { getJobberById, createApplyment, deleteAnnouncement, deleteJobber, deleteRecruiter, deleteCompany } from '../services/api';
import { userId, type } from '../services/url';

export default class Buttons extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.action = this.getAttribute('action');
    this.color = this.getAttribute('color');
    this.siren = this.getAttribute('siren');
    this.id = this.getAttribute('id');
    this.app = document.querySelector('#app');
    this.margin = this.getAttribute('margin');
    this.job_id = this.getAttribute('job-id');
    this.createApplyment = async () => {
        const values = {job_id: parseInt(this.job_id)};
        const user = await getJobberById(userId);
        Object.assign(values, user.data[0]);
        const res = await createApplyment(values);
        if (!res.data) {
          document.location.reload(true);
        }
    }
  }

  onClick() {
    const self = this;
    const button = this.shadowRoot.querySelector('div');
    button.onclick = function() {
      switch (self.action) {
        case 'login':
            self.app.innerHTML = '<custom-modal width="450" height="600" backgroundColor="#2A025C"><custom-form type="login"></custom-form></custom-modal>';
          break;
        case 'logout':
          sessionStorage.clear();
          document.querySelector('app-content').setAttribute('user', false);
          document.location.reload(true);
          break;
        case 'signup':
            self.app.innerHTML = '<custom-modal width="450" height="600" backgroundColor="#2A025C"><custom-signup></custom-signup></custom-modal>';
          break;
        case 'confirmSiren':
            self.app.innerHTML = `<custom-modal width="800" height="700" backgroundColor="#2A025C"><custom-form type="companyBySiren" siren="${self.siren}"></custom-form></custom-modal>`;
          break;
        case 'returnSiren':
            self.app.innerHTML = '<custom-modal width="700" height="400" backgroundColor="#2A025C"><custom-form type="company"></custom-form></custom-modal>';
          break;
        case 'createAnnouncement':
            console.log('clicked')
            self.app.innerHTML = '<p>Bonjour</p>';
            self.app.innerHTML = '<custom-modal width="800" height="700" backgroundColor="#2A025C"><custom-form type="createAnnouncement"></custom-form></custom-modal>';
          break;
        case 'announcement':
            self.app.innerHTML = '<custom-card>announcement</custom-card>';
          break;
        case 'applyment':
            type == '1' ? self.createApplyment() : self.app.innerHTML = '<custom-modal width="800" height="700" backgroundColor="#2A025C"><custom-form type="jobber"></custom-form></custom-modal>';
          break;
        case 'getCompanyBySiren':
            self.app.innerHTML = '<custom-modal width="450" height="600" backgroundColor="#2A025C"><custom-form type="companyBySiren"></custom-form></custom-modal>';
          break;
        case 'confirmDeleteannouncement':
            deleteAnnouncement(self.id);
            document.location.reload(true);
          break;
        case 'confirmDeletejobber':
            deleteJobber(userId);
            sessionStorage.clear();
            document.location.reload(true);
          break;
        case 'confirmDeleterecruiter':
            deleteRecruiter(userId);
            sessionStorage.clear();
            document.location.reload(true);
          break;
        case 'confirmDeletecompany':
            deleteCompany(userId);
            sessionStorage.clear();
            document.location.reload(true);
          break;
      }
    }
  }

  onHover() {
    const self = this
    const button = this.shadowRoot.querySelector('div');

    switch (self.color) {
      case 'white':
        button.onmouseover = function() {
          this.style.backgroundColor = '#42038f';
          this.style.color = 'white';
        }
        button.onmouseleave = function() {
          this.style.backgroundColor = 'white';
          this.style.color = '#42038f';
        }
        break;
      case 'blue':
        button.onmouseover = function() {
          this.style.backgroundColor = 'white';
          this.style.color = '#42038f';
        }
        button.onmouseleave = function() {
          this.style.backgroundColor = '#42038f';
          this.style.color = 'white';
        }
        break;
    }

  }

  connectedCallback() {
    this.shadow.innerHTML = this.render();
    this.onClick();
    this.onHover();
  }

  render() {
    return `
        <div style="${this.style().btn}" >
            <slot />
        </div>
    `
  }

  style() {
    const white = `
        background-color: white;
        color: #42038f;
      `

    const blue = `
        background-color: #42038f;
        color: white;
      `

    const btn = `
        border: none;
        padding: 5px 15px;
        cursor: pointer;
        width:  90px;
        height: 38px;
        border-radius: 50px;
        margin: ${this.margin};
        text-align: center;
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        ${this.color === 'white' ? white : blue}
        display: flex;
        place-items: center;
        place-content: center;
      `

    return {
      btn : btn,
    }
  }

}
