import { parseDate } from '../services/utils'
import { userId } from '../services/url'
import { getCompanyById } from '../services/api'

export default class CompanyProfil extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.data = {};
    this.app = document.querySelector('#app');
    this.getAllData = async () => {
      console.log(userId)
      const res = await getCompanyById(userId);
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
          Profil
          <div style='${this.style().info}'>
            <btn-modify color='purple' action='company'></btn-modify>
            <btn-delete color='purple' action='company'></btn-delete>
          </div>
        </div>
      `;
  }

  style() {
    
    const card = `
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 200px;
      width: 800px;
      box-shadow: 7px 3px 43px rgba(0,0,0,1);
      border-radius: 15px;
      margin-bottom : 50px;
      background-color: white;
    `
    
    const info = `
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    `

    return {
        card : card,
        info : info
    }
  }
}
