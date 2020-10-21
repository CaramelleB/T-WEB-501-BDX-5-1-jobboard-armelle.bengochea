import { AuthStr } from '../services/url'

export default class Header extends HTMLElement {

    constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {
      this.shadow.innerHTML = this.render();
    }

    render() {
        return AuthStr ? `
            <div>
                <div style="${this.style().main}">
                    <h1 style="${this.style().logo}">Job Board</h1>
                    <nav style="${this.style().nav}">
                        <custom-btn
                            action="logout"
                            color="blue"
                        >
                            Logout
                        </custom-btn>
                    </nav>
                <div style="${this.style().main4}">
                    <app-tab></app-tab>
                </div>
            </div>
        ` : `
            <div>
                <div style="${this.style().main}">
                    <h1 style="${this.style().logo}">Job Board</h1>
                    <nav style="${this.style().nav}">
                        <custom-btn
                            action="login"
                            color="blue"
                        >
                            Login
                        </custom-btn>
                        <custom-btn
                            action="signup"
                            color="white"
                        >
                            Sign Up
                        </custom-btn>
                    </nav>
                </div>
                <img src='../img/drop.png' style="${this.style().drop}">
                <div style="${this.style().main2}">
                    <h2 style="${this.style().text}">Find the best job here !</h2>
                    <img src='../img/people.png' style="${this.style().people}">
                </div>
                <content-cards style="${this.style().main3}"></content-cards>
            </div>
        `
    }

    style() {
        const logo =  `
            height: 61px;
            font-size: 40px;
            color: #fc5400;
            text-decoration: none solid rgb(252, 84, 0);
            text-align: center;
            font-family: 'Roboto Condensed', sans-serif;
            text-transform: uppercase;
        `

        const main = `
            margin-top: 2vh;
            display: flex;
            flex-direction: row;
            z-index: 12;
            position: absolute;
            align-items: center;
            padding-left: 8vw;
            padding-right: 8vw;
            width: 84vw;
            place-content: space-between;
        `

        const nav = `
            display: flex;
            flex-direction: row;
            place-content: space-between;
            width: 280px;
        `

        const main2 = `
            display: flex;
            flex-direction: row;
            z-index: 10;
            position: absolute;
            align-items: center;
            padding-left: 5vw;
            padding-right: 5vw;
            width: 90vw;
            place-content: space-between;
            height: 80vh;
            top: 8vh;
        `

        const main3 = `
            display: flex;
            flex-direction: row;
            z-index: 12;
            position: absolute;
            align-items: center;
            margin-left: 8vw;
            margin-right:8vw;
            width: 84vw;
            place-content: center;
            height: 80vh;
            top: 70vh;
        `

        const main4 = `
            display: flex;
            flex-direction: row;
            z-index: 10;
            position: absolute;
            align-items: center;
            padding-left: 5vw;
            padding-right: 5vw;
            width: 90vw;
            place-content: space-between;
            height: 90vh;
            top: 10vh;
        `

        const drop = `
            height: 70vw;
            position: absolute;
            top: -45vh;
            right: -5vw;
            z-index: 0;
        `

        const text = `
            font-family: 'Crimson Text', serif;
            font-size: 80px;
            color: #2a025c;
            text-decoration: none solid rgb(42, 2, 92);
            text-align: center;
            margin-left: 6vw;
        `

        const people = `
            margin-right: 6vw;
            height: 80vh;
        `
        return {
            logo : logo,
            main : main,
            nav : nav,
            main2 : main2,
            main3 : main3,
            main4 : main4,
            drop : drop,
            text : text,
            people : people
          }
    }
}
