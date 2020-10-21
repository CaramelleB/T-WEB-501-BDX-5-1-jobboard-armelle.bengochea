import { parseDate } from '../services/utils'
import { userId } from '../services/url'
import { getJobberById } from '../services/api'

export default class JobberProfil extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.data = {};
    this.app = document.querySelector('#app');
    this.getAllData = async () => {
      const res = await getJobberById(userId);
      this.data = res.data;
      console.log(this.data)
    }
  }


  onHover(him, index, data) {
    const self = this
    const hisData = data[index];    
    him.onmouseover = function() {
     
    }
    him.onmouseleave = function(){
      
    }
    him.onclick = function() {
      self.app.innerHTML = `
         <div>Applyments
          </div>
        `
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
    });
    const card = this.shadow.querySelectorAll('.card');
    card.forEach((item, i) => {
      self.onHover(item, i, data);
    });

  }

  cards(data, index) {
    return `
      <div style='${this.style().card}'>
        <div style='${this.style().info}'>
          <btn-modify color='purple' action='jobber'></btn-modify>
          <btn-delete color='purple' action='jobber'></btn-delete>
        </div>
        <div style='${this.style().info}'>
          <p style='${this.style().p}'>Name : </p><h3 style='${this.style().h3}' >${data.first_name} ${data.last_name}</h3>
        </div>
        <div style='${this.style().info}'>
          <p style='${this.style().p}'>CV : </p><h3 style='${this.style().h3}' >${data.cv}</h3>
        </div>
        <div style='${this.style().info}'>
          <p style='${this.style().p}'>Description : </p><h3 style='${this.style().h3}' >${data.description}</h3>
        </div> 
        <div style='${this.style().info}'>
          <p style='${this.style().p}'>Skills : </p><h3 style='${this.style().h3}' >${data.skills}</h3>
        </div> 
        <div style='${this.style().info}'>
          <p style='${this.style().p}'>Website : </p><h3 style='${this.style().h3}' >${data.web_site}</h3>
        </div> 
        <div style='${this.style().info}'>
          <p style='${this.style().p}'>Linkedin : </p><h3 style='${this.style().h3}' >${data.linkedin}</h3>
        </div>
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

    const p = `
      font-family: Roboto Condensed;
      font-size: 15px;
      font-weight: 400;
      color: white;
      background-color: #fc5400;
      margin-right: 20px;
    `

    return {
        card : card,
        info : info,
        h3 : h3,
        p
    }
  }
}
