export default class Modals extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.width = this.getAttribute('width');
        this.height = this.getAttribute('height');
        this.backgroundColor = this.getAttribute('backgroundColor');
    }

    onClick() {
        const modal = this.shadowRoot.getElementById('modal');
        const close = this.shadowRoot.getElementById('close');
            close.onclick = function() {
                modal.style.display = "none";
            }
    }

    connectedCallback() {
        this.shadow.innerHTML = this.render();
        this.onClick();
    }

    render() {
        return `
            <div id="modal" style="${this.style().background}" >
                <div style="${this.style().modal}" >
                    <span id="close" style="${this.style().close}">&times;</span>
                    <div style="${this.style().modalContent}"><slot /></div>
                </div>
            </div>
        `
    }

    style() {
        const self = this;
        const closeColor = self.backgroundColor === null ? 'black' : 'white';
        const backgroundColor = self.backgroundColor === null ? 'white' : self.backgroundColor;

        const background = `
            width: 100vw;
            height: 100vh;
            position: fixed;
            z-index: 20;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: auto;
            background-color: rgba(0,0,0,0.4);
        `

        const modal = `
            background-color: ${backgroundColor};
            width: ${self.width}px;
            height: ${self.height}px;
            opacity: 100%;
            place-content: flex-end;
            display: flex;
        `

        const close = `
            font-size: 50px;
            cursor: pointer;
            margin-right: 15px;
            margin-top: 10px;
            color: ${closeColor};
            position: absolute;
        `
        
        const modalContent = `
            height: ${self.height}px;
            width: ${self.width}px;
        `

        return {
            background : background,
            modal : modal,
            close : close,
            modalContent : modalContent
        }

    }

}
