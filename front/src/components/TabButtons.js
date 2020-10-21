export default class TabButtons extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.state = this.getAttribute('state');
    }

    onClick() {
        const button = this.shadowRoot.querySelector('div'); 
        button.onclick = function() {
            this.style.backgroundColor = '#42038f';
            this.style.color = 'white';
            this.setAttribute('state', 'active')
        }
    }

    connectedCallback() {
        this.shadow.innerHTML = this.render();
        this.onClick();
        
    }

    render() {
        return `
            <div style="${this.style().btn}" >
                <slot />
            </div>
        `
    }

    style() {
        const btn = `
            border: none;
            padding: 5px 15px;
            cursor: pointer;
            width:  150px;
            height: 38px;
            border-radius: 50px;
            margin: ${this.margin};
            text-align: center;
            font-size: 16px;
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            background-color: #42038f;
            color: white;
            display: flex;
            place-items: center;
            place-content: center;
        `

        return {
            btn : btn,
        }
    }

}
