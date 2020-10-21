export default class Inputs extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.name = this.getAttribute('name');
        this.value = this.getAttribute('value');
        this.placeholder = this.innerHTML;
        this.req = this.getAttribute('required');   
        this.required = this.req === true ? 'required' : '';
        this.type = this.getAttribute('type');
    }

    connectedCallback() {
        this.shadow.innerHTML = this.render();
    }

    render() {
        return this.type === 'file' ? `
            <div style="${this.style().div}">
                <img src='./img/icon/upload-solid.svg' alt='font-awesome' style='${this.style().icon}'/>
                <label 
                    for="${this.name}" 
                    style="${this.style().label}"
                >${this.placeholder}</label>
                <input 
                    name="${this.name}" 
                    style="${this.style().inputfile}" 
                    type="${this.type}"
                    ${this.required}
                >
            </div>
        `
        :
        `
        <div>
            <input 
                name="${this.name}" 
                placeholder="${this.placeholder}" 
                style="${this.style().input}" 
                type="${this.type}"
                ${this.value == null ? "" : `value='${this.value}'`}
            >
        </div>
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
            font-size:18px;
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
