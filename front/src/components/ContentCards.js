import { parseDate } from '../services/utils'
import { getAnnouncements } from '../services/api'
import { type, userId } from '../services/url'

export default class ContentCards extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.data = {};
    this.app = document.querySelector('#app');
    this.getAllData = async () => {
      const res = await getAnnouncements();
      this.data = res.data;
    }
  }


  onHover(him, index, data) {
    const self = this
    const hisData = data[index];
    him.onmouseover = function() {
      him.style.width = '380px';
      him.style.height = '530px';
    }
    him.onmouseleave = function(){
      him.style.width = '350px';
      him.style.height = '500px';
    }
    him.onclick = function() {
      self.app.innerHTML = `
        <custom-modal width="1000" height="800" backgroundColor="#2A025C">
          <div style='${self.style().cardModal}'>
            <div style='${self.style().left}'>
              <img style='${self.style().coverModal}' src='./img/cover/${hisData.cover}' />
              <div style='${self.style().leftInfo}'>
                <img style='${self.style().logoModal}' src='./img/logo/${hisData.logo}' />
                <h4 style='${self.style().h4Modal}' >${hisData.company_name}</h4>
                <h3 style='${self.style().h3Modal}' >${hisData.job_name}</h3>
                <div style='${self.style().bottomModal}'>
                  <div style='${self.style().info}'>
                    <img src='./img/icon/map-marker-alt-solid.svg' alt='font-awesome' style='${self.style().icon}'/>
                    <p style='${self.style().p}'>${hisData.localisation}</p>
                  </div>
                  <div style='${self.style().info}'>
                    <img src='./img/icon/briefcase-solid.svg' alt='font-awesome' style='${self.style().icon}'/>
                    <p style='${self.style().p}'>${hisData.contract_type_name}</p>
                  </div>
                  <div style='${self.style().info}'>
                    <img src='./img/icon/calendar-alt-regular.svg' alt='font-awesome' style='${self.style().icon}'/>
                    <p style='${self.style().p}'>${parseDate(hisData.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div style='${self.style().right}'>
              ${type == 2 && userId == hisData.user_id ? `
                <div style='${self.style().info}'>
                  <btn-modify id="${hisData.id}" color='white' action="announcement"></btn-modify>
                  <btn-delete id="${hisData.id}" color='white' action="announcement"></btn-delete>
                </div>
              ` : ``}
              <h5 style='${self.style().h5Modal}'>About ${hisData.company_name}</h5>
              <p style='${self.style().pModal}'>${hisData.description}</p>
              <h5 style='${self.style().h5Modal}'>Job description</h5>
              <p style='${self.style().pModal}'>${hisData.job_description}</p>
              <h5 style='${self.style().h5Modal}'>Missions</h5>
              <p style='${self.style().pModal}'>${hisData.missions}</p>
              <h5 style='${self.style().h5Modal}'>What we're looking for</h5>
              <p style='${self.style().pModal}'>${hisData.profile}</p>
              <h5 style='${self.style().h5Modal}'>More infos</h5>
              <p style='${self.style().pModal}'>Salary : ${hisData.salary}</p>
              <p style='${self.style().pModal}'>Job start : ${parseDate(hisData.job_start)}</p>
              ${type == 1 || type == false ? `<custom-btn job-id=${hisData.id} action='applyment'>Apply</custom-btn>` : ``}
            </div>
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
        <div style='${this.style().card}' id='${index}' class='card'>
          <img style='${this.style().cover}' src='./img/cover/${data.cover}' />
            <img style='${this.style().logo}' src='./img/logo/${data.logo}' />
            <h4 style='${this.style().h4}' >${data.company_name}</h4>
            <h3 style='${this.style().h3}' >${data.job_name}</h3>
          <div style='${this.style().bottom}'>
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
      `;
  }

  style() {
    const card = `
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 7px 3px 43px rgba(0,0,0,1);
      width: 350px;
      height: 500px;
      background-color: white;
      text-align: center;
      border-radius: 15px;
      margin-left: 50px;
      margin-right: 50px;
      cursor: pointer;
    `

    const cover = `
      width: 100%;
      height: 225px;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
    `

    const logo = `
      width: 140px;
      height: 140px;
      border-radius: 50%;
      margin-top: -80px;
      object-fit: cover;
    `

    const h4 = `
      font-family: Roboto Condensed;
      font-size: 18px;
      color: #757575;
      text-transform: uppercase;
      margin-bottom: 0px;
    `

    const h3 = `
      font-family: Roboto Condensed;
      font-size: 24px;
      color: black;
    `

    const bottom = `
      margin-top: auto;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      display: flex;
      flex-direction: row;
      background-color: #fc5400;
      width: 100%;
      height: 65px;
      align-items: center;
      color: white;
    `

    const info = `
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
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

    const cardModal = `
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
    `

    const left = `
      height: 100%;
      width: 60%;
    `

    const leftInfo = `
      margin-top: -500px;
      display: flex;
      flex-direction: column;
      align-items: center;
    `

    const right = `
      height: 90%;
      width: 40%;
      padding: 30px;
    `

    const coverModal = `
      width: 100%;
      height: 100%;
      filter: brightness(0.5);
    `

    const logoModal = `
      width: 140px;
      height: 140px;
      border-radius: 50%;
      margin-top: -80px;
      object-fit: cover;
      z-index: 100;
    `

    const h4Modal = `
      color: white;
      font-size: 25px;
      font-family: Roboto Condensed;
      z-index: 100;
      margin-top: 10px;
      margin-bottom: 0;
    `

    const h3Modal = `
      color: white;
      font-size: 40px;
      font-family: Roboto Condensed;
      width: 70%;
      z-index: 100;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
      background-color: #fc5400;
    `

    const bottomModal = `
      display: flex;
      flex-direction: row;
      width: 80%;
      height: 65px;
      align-items: center;
      color: white;
      z-index: 100;
    `

    const h5Modal = `
      color: white;
      font-size: 18px;
      font-family: Roboto Condensed;
      background-color: #fc5400;
      width: auto;
    `

    const pModal = `
      color: white;
      font-size: 14px;
      font-family: Roboto;
    `



    return {
        card : card,
        cover : cover,
        logo : logo,
        h4 : h4,
        h3 : h3,
        bottom : bottom,
        info : info,
        icon : icon,
        p : p,
        cardModal : cardModal,
        left : left,
        leftInfo : leftInfo,
        right : right,
        coverModal : coverModal,
        logoModal : logoModal,
        h4Modal : h4Modal,
        h3Modal : h3Modal,
        bottomModal : bottomModal,
        h5Modal : h5Modal,
        pModal : pModal
    }
  }
}
