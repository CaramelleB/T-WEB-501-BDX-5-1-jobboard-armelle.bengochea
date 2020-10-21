import { parseDate } from '../services/utils'
import { getApplyRecruiter } from '../services/api'
import { userId } from '../services/url'

export default class RecruiterApplyments extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.data = {};
    this.app = document.querySelector('#app');
    this.getAllData = async () => {
      const res = await getApplyRecruiter(userId);
      this.data = res.data;
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

  }

  cards(data, index) {
    return `
        <div style='${this.style().card}' id='${index}'>
        <div style='${this.style().left}'>
            <img style='${this.style().cover}' src='./img/cover/${data.cover}' />
          </div>
          <div style='${this.style().right}'>
            <img style='${this.style().logo}' src='./img/logo/${data.logo}' />
            <div style='${this.style().column}'>
              <h4 style='${this.style().h4}'>${data.job_name}</h4>
              <h3 style='${this.style().h3}'>${data.first_name} ${data.last_name}</h3>
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

    const left = `
      height: 100%;
      width: 30%;
    `
    
    const right = `
      height: 100%;
      width: 70%;
      display: flex;
      align-items: center;
    `

    const cover = `
      width: 100%;
      height: 100%;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    `
    
    const logo = `
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-left: -50px;
      object-fit: cover;
    `
    
    const h3 = `
      color : #fc5400;
      font-family: Roboto Condensed;
      font-size: 24px;
      margin: 0;
    `
    const h4 = `
      font-family: Roboto Condensed;
      font-size: 18px;
      color: #757575;
      text-transform: uppercase;
    `

    return {
        card : card,
        left : left,
        right : right,
        cover : cover,
        logo : logo,
        h4 : h4,
        h3 : h3
    }
  }
}
