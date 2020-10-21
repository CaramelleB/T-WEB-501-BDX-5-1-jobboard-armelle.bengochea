export default class SignUp extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.shadow.innerHTML = this.render();
    }

    render() {
        return `
            <div style="${this.style().div}">
                <custom-btn-sign 
                    src="../img/jobber.png"
                    color="white"
                    backgroundColor="#42038f"
                    action="jobber"
                    style="${this.style().btn}"
                >
                    Jobber
                </custom-btn-sign>
                <custom-btn-sign 
                    src="../img/recruiter.png"
                    color="white"
                    backgroundColor="#fc5400"
                    action="recruiter"
                    style="${this.style().btn}"
                >
                    Recruiter
                </custom-btn-sign>
                <custom-btn-sign 
                    src="../img/company.png"
                    color="black"
                    backgroundColor="#FFECD8"
                    action="company"
                    style="${this.style().btn}"
                >
                    Company
                </custom-btn-sign>
            </div>
        `
    }

    style() {
        const div = `
            display: flex;
            flex-direction: column;
            height: 100%;
        `

        const btn = `
            flex: 1;
        `

        return {
            div : div,
            btn : btn
        }

    }

}
