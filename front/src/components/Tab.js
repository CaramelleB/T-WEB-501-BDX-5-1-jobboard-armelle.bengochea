import { type, userId } from '../services/url'

export default class Tab extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    onClick() {
        const self = this;
        this.tab = this.shadow.getElementById('tabButtons');
        this.tabContent = this.shadow.getElementById('tabContent');
        const tabButton = this.tab.querySelectorAll('btn-tab');
        tabButton.forEach((item, i) => {
            item.onclick = function () {
                for (let x= 0; x < self.tabContent.childElementCount; x++) {
                    self.tabContent.children[x].setAttribute('active', false);
                    self.tabContent.children[x].style.display = 'none';
                }
                self.content = self.tabContent.children[i];
                self.content.style.display = 'block';
                self.content.setAttribute('active', true);
            }
        });
    }

    onHover() {
    

    }

    connectedCallback() {
        this.shadow.innerHTML = this.render();
        this.onClick();
        this.onHover();
    }
    
    render(){
        if (type === '1')
        {
            return `
                <div>
                    <div id="tabButtons"  style="${this.style().tabButtons}">
                        <btn-tab>Announcements</btn-tab>
                        <btn-tab>Applyments</btn-tab> 
                        <btn-tab>Profile</btn-tab> 
                    </div>
                    <div id="tabContent">
                        <div style="${this.style().tab}"><content-cards style="${this.style().contentTab}"></content-cards></div>
                        <div style="${this.style().tab}"><jobber-applyments style="${this.style().applyments}"></jobber-applyments></div>
                        <div style="${this.style().tab}"><jobber-profile style="${this.style().contentTab}"></jobber-profile></div>
                    </div>
                </div>
            `;
        }
        if (type === '2')
        {
            return `
                <div>
                    <div id="tabButtons"  style="${this.style().tabButtons}">
                        <btn-tab>Announcements</btn-tab>
                        <btn-tab>Applyments</btn-tab> 
                        <btn-tab>Companies</btn-tab> 
                        <btn-tab>Profile</btn-tab> 
                    </div>
                    <div id="tabContent">
                        <div style="${this.style().tab}">
                            <custom-btn
                                action="createAnnouncement"
                                color="blue"
                                margin="25px"
                            >
                                Create an announcement
                            </custom-btn>
                            <content-cards style="${this.style().contentTab}"></content-cards>
                        </div>
                        <div style="${this.style().tab}"><recruiter-applyments style="${this.style().applyments}"></recruiter-applyments></div>
                        <div style="${this.style().tab}"><applyments-card style="${this.style().applyments}"></applyments-card></div>
                        <div style="${this.style().tab}"><recruiter-profile style="${this.style().applyments}"></recruiter-profile></div>
                    </div>
                </div>
            `
        }
        if (type === '3')
        {
            return `
                <div>
                    <div id="tabButtons"  style="${this.style().tabButtons}">
                        <btn-tab>Announcements</btn-tab>
                        <btn-tab>Recruiter</btn-tab> 
                        <btn-tab>Profile</btn-tab> 
                    </div>
                    <div id="tabContent">
                        <div style="${this.style().tab}"><content-cards style="${this.style().contentTab}"></content-cards></div>
                        <div style="${this.style().tab}"><applyments-card style="${this.style().applyments}"></applyments-card></div>
                        <div style="${this.style().tab}"><company-profile style="${this.style().contentTab}"></company-profile></div>
                    </div>
                </div>
            `
        }
    }

    style() {

        const tabButtons = `
            display: flex;
            flex-direction: row;
        `

        const tab = `
            display: none;
            background-color: white;
            width: 90vw;
            height: 70vh;
        `

        const contentTab = `
            display: flex;
            height: calc(100% - 80px);
            padding-top: 40px;
            overflow: auto;
        `

        const applyments = `
            display: flex;
            flex-direction: column;
            padding: 20px;
            align-items: center;
        `

        return {
            tabButtons : tabButtons,
            tab : tab,
            contentTab : contentTab,
            applyments : applyments
        }
    }
}
