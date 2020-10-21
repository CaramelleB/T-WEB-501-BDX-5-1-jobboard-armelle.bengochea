import { parseDate } from '../services/utils'
import { userId } from '../services/url'
import { getRecruiterById } from '../services/api'

export default class CompanyProfil extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.data = {};
    this.app = document.querySelector('#app');
    this.getAllData = async () => {
      const res = await getRecruiterById(userId);
      this.data = res.data;
      console.log(this.data)
    }
  }

  async connectedCallback() {
    await this.getAllData();
    this.renderLoop(this.data);
  }

  async renderLoop(data) {
    const self = this;
    await data.map((items, index) => {
      self.shadow.innerHTML += self.cards(items, index);
    })
  }

  cards(data, index) {
    return `
        <div style='${this.style().card}'>
          <div style='${this.style().info}'>
            <btn-modify color='purple' action='recruiter'></btn-modify>
            <btn-delete color='purple' action='recruiter'></btn-delete>
          </div>
          <h3 style='${this.style().h3}' >${data.first_name} ${data.last_name}</h3>
        </div>
      `;
  }

  style() {
    
    const card = `
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      width: 100%;
      padding : 50px;
    `
    
    const info = `
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    `
    
    const h3 = `
      font-family: Roboto Condensed;
      font-size: 24px;
      color: black;
    `

    return {
        card : card,
        info : info,
        h3 : h3
    }
  }
}
