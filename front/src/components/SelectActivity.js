import { getField } from '../services/api'

export default class SelectActivity extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.data = {};
        this.app = document.querySelector('#app');
        this.getAllData = async () => {
            const res = await getField();
            this.data = res.data;
        }
        this.shadow.innerHTML += `
          <select name="activity_field_id" style='${this.style().input}'>
            <option value="" disabled selected>Select Activity Field</option>
          </select>
        `;
    }

    async connectedCallback() {
        await this.getAllData();
        this.renderLoop(this.data);
      }

      async renderLoop(data) {
        const self = this;
        const select = this.shadow.querySelector('select');
        await data.map((items, index) => {
          select.innerHTML += `
              ${self.option(items, index)}
          `;
        });

      }

      option(data, index) {
        return  `
        <option value="${data.id}">${data.activity_field_name}</option>
        `
        }

    style() {
        const div = `
            position: relative;
            width:300px;
            height: 35px;
            display: inline-block;
            text-align: center;
            margin: 20px;
            background-color: rgb(66, 3, 143);
            padding:  10px 10px 10px 20px;
            -webkit-border-radius: 30px;
            -moz-border-radius: 30px;
                 border-radius: 30px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        `

        const input = `
            font-size:15px;
            padding:  10px 10px 10px 20px;
            display:block;
            width:300px;
            height: 35px;
            margin: 20px;
            outline: none;
            -webkit-border-radius: 30px;
            -moz-border-radius: 30px;
                 border-radius: 30px;
            background-color: rgb(66, 3, 143);
            color: white;
            border: none;
            font-family: 'Roboto', sans-serif;
        `

        const inputfile = `
            display: inline-block;
            position: absolute;
            z-index: 1;
            width: 300px;
            height: 35px;
            top: 0;
            left: 0;
            opacity: 0;
            cursor: pointer;
        `

        const label = `
            position: relative;
            z-index: 0;
            display: inline-block;
            cursor: pointer;
            color: white;
            padding: 10px 0;
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
        `

        const icon = `
            height: 20px;
            width: 20px;
            margin-left: -15px;
            margin-right: 15px;
        `

        return {
            div : div,
            input : input,
            inputfile : inputfile,
            label : label,
            icon : icon
        }

    }

}
