import { parseDate } from '../services/utils'
import { getApplymentsJobber } from '../services/api'
import { userId } from '../services/url'

export default class JobberApplyments extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.data = {};
    this.app = document.querySelector('#app');
    this.getAllData = async () => {
      const res = await getApplymentsJobber(userId);
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
    return data.deleted === 0 ? `
        <div style='${this.style().white}' id='${index}'>
          <div style='${this.style().left}'>
            <img style='${this.style().cover}' src='./img/cover/${data.cover}' />
          </div>
          <div style='${this.style().right}'>
            <img style='${this.style().logo}' src='./img/logo/${data.logo}' />
            <div style='${this.style().column}'>
              <h4 style='${this.style().h4}'>${data.company_name}</h4>
              <h3 style='${this.style().h3}'>${data.job_name}</h3>
              <div style='${this.style().bottom}'>
                  <div style='${this.style().info}'>
                    <img src='./img/icon/map-marker-alt-solid_grey.svg' alt='font-awesome' style='${this.style().icon}'/>
                    <p style='${this.style().p}'>${data.localisation}</p>
                  </div>
                  <div style='${this.style().info}'>
                    <img src='./img/icon/briefcase-solid_grey.svg' alt='font-awesome' style='${this.style().icon}'/>
                    <p style='${this.style().p}'>${data.contract_type_name}</p>
                  </div>
                  <div style='${this.style().info}'>
                    <img src='./img/icon/calendar-alt-regular_grey.svg' alt='font-awesome' style='${this.style().icon}'/>
                    <p style='${this.style().p}'>${parseDate(data.created_at)}</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      ` : `
      <div style='${this.style().grey}' id='${index}'>
        <div style='${this.style().left}'>
          <img style='${this.style().cover}' src='./img/cover/${data.cover}' />
        </div>
        <div style='${this.style().right}'>
          <img style='${this.style().logo}' src='./img/logo/${data.logo}' />
          <div style='${this.style().column}'>
            <h4 style='${this.style().h4white}'>${data.company_name}</h4>
            <h3 style='${this.style().h3}'>${data.job_name}</h3>
            <div style='${this.style().bottomwhite}'>
                <div style='${this.style().info}'>
                  <img src='./img/icon/map-marker-alt-solid.svg' alt='font-awesome' style='${this.style().icon}'/>
                  <p style='${this.style().p}'>${data.localisation}</p>
                </div>
                <div style='${this.style().info}'>
                  <img src='./img/icon/briefcase-solid.svg' alt='font-awesome' style='${this.style().icon}'/>
                  <p style='${this.style().p}'>${data.contract_type_name}</p>
                </div>
                <div style='${this.style().info}'>
                  <img src='./img/icon/calendar-alt-regular.svg' alt='font-awesome' style='${this.style().icon}'/>
                  <p style='${this.style().p}'>${parseDate(data.created_at)}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      `;
  }

  style() {
    
    const white = `
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
    
    const grey = `
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 200px;
      width: 800px;
      box-shadow: 7px 3px 43px rgba(0,0,0,1);
      border-radius: 15px;
      margin-bottom : 50px;
      background-color: grey;
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
    
    const column = `
      display: flex;
      flex-direction: column;
      width: 80%;
      margin-left: 15px;
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
    
    const h4white = `
      font-family: Roboto Condensed;
      font-size: 18px;
      color: white;
      text-transform: uppercase;
    `

    const bottom = `
      display: flex;
      flex-direction: row;
      width: 80%;
      height: 65px;
      align-items: center;
      color:  #757575;
      z-index: 100;
    `
    
    const bottomwhite = `
      display: flex;
      flex-direction: row;
      width: 80%;
      height: 65px;
      align-items: center;
      color:  white;
      z-index: 100;
    `

    const info = `
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: left;
      margin-right: 25px;
    `

    const icon = `
      height: 20px;
      width: 20px;
      margin-right: 5px;
    `

    const p = `
      font-family: Roboto Condensed;
      font-size: 15px;
      font-weight: 400;
    `

    return {
        white : white,
        grey : grey,
        left : left,
        right : right,
        cover : cover,
        logo : logo,
        column : column,
        h3 : h3,
        h4 : h4,
        h4white : h4white,
        bottom : bottom,
        bottomwhite : bottomwhite,
        info : info,
        icon : icon,
        p : p
    }
  }
}
