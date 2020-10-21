import {getCompanyBySiren} from '../services/apiSiren';
import {login, createJobber, createRecruiter, createCompany, createAnnouncement, getJobberById, getRecruiterById, getCompanyById, getAnnouncementById, updateJobber, updateRecruiter, updateCompany, updateAnnouncement} from '../services/api';
import { userId } from '../services/url'

export default class Form extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.type = this.getAttribute('type');
        this.siren = this.getAttribute('siren');
        this.id = this.getAttribute('id');
        this.data = {};
        this.app = document.querySelector('#app');
        this.getAllData = async () => {
            switch (this.type) {
                case 'updateJobber':
                    const jobber = await getJobberById(userId);
                    this.data = jobber.data[0];
                  break;
                case 'updateRecruiter':
                    const recruiter = await getRecruiterById(userId);
                    this.data = recruiter.data[0];
                  break;
                case 'updateCompany':
                    const company = await getCompanyById(userId);
                    this.data = company.data[0];
                  break;
                case 'updateAnnouncement':
                    const announce = await getAnnouncementById(this.id);
                    this.data = announce.data[0];
                  break;
              }
            
        }
        this.getSiren = async (siren, action) => {
            const res = await getCompanyBySiren(siren);
            this.data = res;
            if(action === 'confirm')
            {
                this.app.innerHTML = `
                <custom-modal width="700" height="400" backgroundColor="#2A025C">
                    <div style="${this.style().form}">
                    <h3 style="${this.style().h5}">Are you ${this.data.siege_social.nom_raison_sociale}</h3>
                        <div style="${this.style().action2}">
                            <custom-btn action="returnSiren" color="white">Return
                            </custom-btn>
                            <custom-btn
                            action="confirmSiren"
                            siren="${siren}"
                            color="white">Confirm
                            </custom-btn>
                        </div>
                    </div>
                </custom-modal>`
            }
            return res;
        }
        this.login = async (values) => {
            const res = await login(values);
            console.log(res);
            if (!res.data) {
              sessionStorage.setItem('Authorization', res.access_token);
              sessionStorage.setItem('userId', res.user_id);
              sessionStorage.setItem('type', res.type);
              document.querySelector('app-content').setAttribute('user', true);
              document.location.reload(true);
            }
        }
        this.signup = async (values) => {
            switch (this.type) {
                case 'jobber':
                    const jobber = await createJobber(values);
                    if (jobber.msg) {
                    return true;
                    }
                    break;
                case 'recruiter':
                    const recruiter = await createRecruiter(values);
                    if (recruiter.msg) {
                    return true;
                    }
                    break;
                case 'companyBySiren':
                    const company = await createCompany(values);
                    if (company.msg) {
                    return true;
                    }
                    break;
                case 'createAnnouncement':
                    const createAnnouncement = await createAnnouncement(values);
                    if (createAnnouncement.msg) {
                    return true;
                    }
                    break;
                default:
                  return false;
            }
        }
        this.update = async (values) => {
            switch (this.type) {
                case 'updateJobber':
                    const jobber = await updateJobber(userId, values);
                    if (jobber.msg) {
                    return true;
                    }
                    break;
                case 'updateRecruiter':
                    const recruiter = await updateRecruiter(userId, values);
                    if (recruiter.msg) {
                    return true;
                    }
                    break;
                case 'updateCompany':
                    const company = await updateCompany(userId, values);
                    if (company.msg) {
                    return true;
                    }
                    break;
                case 'updateAnnouncement':
                    console.log(this.id)
                    const announcement = await updateAnnouncement(this.id, values);
                    if (announcement.msg) {
                    return true;
                    }
                    break;
                default:
                  return false;
            }
        }

    }

    getFormValue() {
      const inputValue = {};
      const customInputs = this.form.querySelectorAll('custom-input');
      customInputs.forEach(items => {
        const input = items.shadowRoot.querySelector('input');
        const name = input.getAttribute('name');
        const value = input.value;
        let obj = {};
        obj[name] = value;
        Object.assign(inputValue, obj);
      });
      return inputValue;
    }

    onClick(btn) {
        const self = this;
        const ok = `<custom-modal width="450" height="600" backgroundColor="#2A025C">Your account is updated</custom-modal>`;
        btn.onclick = function() {
            const values = self.getFormValue();
            switch (self.type) {
                case 'login':
                self.login(values);
                break;
                case 'jobber':
                    Object.assign(values, {type: 1});
                    if (self.signup(values)) {
                    self.app.innerHTML = `<custom-modal width="450" height="600" backgroundColor="#2A025C"><custom-form type="login">Thank you for your registration as a jobber !</custom-form></custom-modal>`
                    } else {
                    document.location.reload(true);
                    }
                break;
                case 'updateJobber':
                    Object.assign(values, {type: 1});
                    if (self.update(values)) {
                        self.app.innerHTML = ok;
                    } else {
                    document.location.reload(true);
                    }
                break;
                case 'recruiter':
                Object.assign(values, {type: 2});
                if (self.signup(values)) {
                    self.app.innerHTML = `<custom-modal width="450" height="600" backgroundColor="#2A025C"><custom-form type="login">Thank you for your registration as a recruiter !</custom-form></custom-modal>`
                } else {
                    document.location.reload(true);
                }
                break;
                case 'updateRecruiter':
                Object.assign(values, {type: 2});
                if (self.update(values)) {
                    self.app.innerHTML = ok;
                } else {
                    document.location.reload(true);
                }
                break;
                case 'updateCompany':
                Object.assign(values, {type: 3});
                if (self.update(values)) {
                    self.app.innerHTML = ok;
                } else {
                    document.location.reload(true);
                }
                break;
                case 'updateAnnouncement':
                Object.assign(values);
                if (self.update(values, self.id)) {
                    self.app.innerHTML = ok;
                } else {
                    document.location.reload(true);
                }
                break;
                case 'company':
                    self.getSiren(self.input.value.replace(/\s/g, ''), 'confirm')
                break;
                case 'companyBySiren':
                    Object.assign(values, {type: 3});
                    if (self.signup(values)) {
                    self.app.innerHTML = `<custom-modal width="450" height="600" backgroundColor="#2A025C"><custom-form type="login">Thank you for your registration as a company !</custom-form></custom-modal>`
                    } else {
                    document.location.reload(true);
                    }
                break;
                default:
                self.signup(values);
            }
        }
    }

    async connectedCallback() {
        this.shadow.innerHTML = await this.render();
        this.form = this.shadow.querySelector('form');
        this.input = this.form.querySelector('custom-input')
          .shadowRoot.querySelector('input');
        this.btn = this.form.querySelector('custom-btn');
        this.onClick(this.btn);
    }

    async render() {
        if (this.type === 'login')
        {
            return `
                <div style="${this.style().form}">
                    <h6 style="${this.style().h6}"><slot /></h6>
                    <form>
                        <custom-input
                            name="email"
                            type="email"
                            required="false"
                        >Email
                        </custom-input>
                        <custom-input
                            name="password"
                            type="password"
                            required="false"
                        >Password
                        </custom-input>
                        <custom-btn
                            action="login"
                            color="white"
                        >Login
                        </custom-btn>
                    </form>
                </div>
            `
        }
        if (this.type === 'updateJobber')
        {
            await this.getAllData();
            return `
                <div style="${this.style().form}">
                    <h5 style="${this.style().h5}">Create a jobber account</h5>
                    <form style="${this.style().formSign}">
                        <custom-input
                            name="first_name"
                            type="text"
                            required="true"
                            value="${this.data.first_name}"
                        >First name
                        </custom-input>
                        <custom-input
                            name="last_name"
                            type="text"
                            required="true"
                            value="${this.data.last_name}"
                        >Last name
                        </custom-input>
                        <custom-input
                            name="linkedin"
                            type="url"
                            required="false"
                            value="${this.data.linkedin}"
                        >Linkedin
                        </custom-input>
                        <custom-input
                            name="web_site"
                            type="url"
                            required="false"
                            value="${this.data.web_site}"
                        >Website
                        </custom-input>
                        <custom-input
                            name="skills"
                            type="text"
                            required="false"
                            value="${this.data.skills}"
                        >Skills
                        </custom-input>
                        <custom-input
                            name="description"
                            type="text"
                            required="false"
                            value="${this.data.description}"
                        >Description
                        </custom-input>
                        <div style="${this.style().action}">
                            <custom-input
                                name="cv"
                                type="file"
                                required="false"
                                value="${this.data.cv}"
                            >CV
                            </custom-input>
                            <custom-btn
                                type="submit"
                                color="white"
                                margin="20px"
                            >Submit
                            </custom-btn>
                        </div>
                    </form>
                </div>
            `
        }
        if (this.type === 'jobber')
        {
            return `
                <div style="${this.style().form}">
                    <h5 style="${this.style().h5}">Create a jobber account</h5>
                    <form style="${this.style().formSign}">
                        <custom-input
                            name="first_name"
                            type="text"
                            required="true"
                        >First name
                        </custom-input>
                        <custom-input
                            name="last_name"
                            type="text"
                            required="true"
                        >Last name
                        </custom-input>
                        <custom-input
                            name="email"
                            type="mail"
                            required="true"
                        >Email
                        </custom-input>
                        <custom-input
                            name="password"
                            type="password"
                            required="true"
                        >Password
                        </custom-input>
                        <custom-input
                            name="linkedin"
                            type="url"
                            required="false"
                        >Linkedin
                        </custom-input>
                        <custom-input
                            name="web_site"
                            type="url"
                            required="false"
                        >Website
                        </custom-input>
                        <custom-input
                            name="skills"
                            type="text"
                            required="false"
                        >Skills
                        </custom-input>
                        <custom-input
                            name="description"
                            type="text"
                            required="false"
                        >Description
                        </custom-input>
                        <div style="${this.style().action}">
                            <custom-input
                                name="cv"
                                type="file"
                                required="false"
                            >CV
                            </custom-input>
                            <custom-btn
                                type="submit"
                                color="white"
                                margin="20px"
                            >Submit
                            </custom-btn>
                        </div>
                    </form>
                </div>
            `
        }
        if (this.type === 'updateRecruiter')
        {
            await this.getAllData();
            return `
            <div style="${this.style().form}">
                <h5 style="${this.style().h5}">Update your account</h5>
                <form style="${this.style().formSign}">
                    <custom-input
                        name="first_name"
                        type="text"
                        required="true"
                        value="${this.data.first_name}"
                    >First name
                    </custom-input>
                    <custom-input
                        name="last_name"
                        type="text"
                        required="true"
                        value="${this.data.last_name}"
                    >Last name
                    </custom-input>
                        <custom-btn
                            type="submit"
                            color="white"
                            margin="20px"
                        >Submit
                        </custom-btn>
                    </div>
                </form>
            </div>
            `
        }
        if (this.type === 'recruiter')
        {
            return `
            <div style="${this.style().form}">
                <h5 style="${this.style().h5}">Create a recruiter account</h5>
                <form style="${this.style().formSign}">
                    <custom-input
                        name="first_name"
                        type="text"
                        required="true"
                    >First name
                    </custom-input>
                    <custom-input
                        name="last_name"
                        type="text"
                        required="true"
                    >Last name
                    </custom-input>
                    <custom-input
                        name="email"
                        type="mail"
                        required="true"
                    >Email
                    </custom-input>
                    <custom-input
                        name="password"
                        type="password"
                        required="true"
                    >Password
                    </custom-input>
                        <custom-btn
                            type="submit"
                            color="white"
                            margin="20px"
                        >Submit
                        </custom-btn>
                    </div>
                </form>
            </div>
            `
        }
        if (this.type === 'company')
        {
            return `
                <div style="${this.style().form}">
                    <h5 style="${this.style().h5}">Create a company account</h5>
                    <form style="${this.style().formSign}" method="get" action="#">
                        <custom-input
                            name="siren_number"
                            type="text"
                            required="true"
                        >Enter your SIREN number
                        </custom-input>
                        <custom-btn
                            type="submit"
                            color="white"
                            margin="25px"
                        >Search
                        </custom-btn>
                    </form>
                </div>
            `
        }
        if (this.type === 'companyBySiren')
        {
            const res = await this.getSiren(this.siren, '')
            return `
            <div style="${this.style().form}">
                <h3 style="${this.style().h5}">Welcome ${res.siege_social.nom_raison_sociale}</h3>
                <p style="${this.style().p}">Just a few more minutes to complete your registration</p>
                <form style="${this.style().formSign}">
                    <custom-input
                        name="email"
                        type="mail"
                        required="true"
                    >Email
                    </custom-input>
                    <custom-input
                        name="password"
                        type="password"
                        required="true"
                    >Password
                    </custom-input>
                    <custom-input
                        name="localisation"
                        type="text"
                        required="true"
                        value="${res.siege_social.libelle_commune}"
                    >Localisation
                    </custom-input>
                    <custom-input
                        name="activity_area"
                        type="text"
                        required="true"
                        value="${res.siege_social.libelle_activite_principale}"
                    >Activity area
                    </custom-input>
                    <custom-input
                        name="year_birth"
                        type="year"
                        required="true"
                        value="${(res.siege_social.date_creation).substring(0, 4)}"
                    >Year birth
                    </custom-input>
                    <custom-input
                        name="number_employees"
                        type="number"
                        required="true"
                        value="${res.siege_social.libelle_activite_principale}"
                    >Number of employees
                    </custom-input>
                    <custom-input
                        name="web_site"
                        type="text"
                    >Website
                    </custom-input>
                    <custom-input
                        name="linkedin"
                        type="text"
                    >Linkedin
                    </custom-input>
                    <custom-input
                        name="facebook"
                        type="text"
                    >Facebook
                    </custom-input>
                    <custom-input
                        name="twitter"
                        type="text"
                    >Twitter
                    </custom-input>
                    <custom-input
                        name="video"
                        type="text"
                    >Video (link)
                    </custom-input>
                    <custom-input
                        name="description"
                        type="text"
                    >Description
                    </custom-input>
                    <custom-input
                        name="logo"
                        type="file"
                    >Logo
                    </custom-input>
                    <custom-input
                        name="cover"
                        type="file"
                    >Cover
                    </custom-input>
                        <custom-btn
                            type="submit"
                            color="white"
                            margin="20px"
                        >Submit
                        </custom-btn>
                    </div>
                </form>
            </div>
            `
        }if (this.type === 'updateCompany')
        {
            await this.getAllData();
            return `
            <div style="${this.style().form}">
                <h3 style="${this.style().h5}">Update your account</h3>
                <form style="${this.style().formSign}">
                    <custom-input
                        name="localisation"
                        type="text"
                        required="true"
                        value="${this.data.localisation}"
                    >Localisation
                    </custom-input>
                    <custom-input
                        name="activity_area"
                        type="text"
                        required="true"
                        value="${this.data.activity_area}"
                    >Activity area
                    </custom-input>
                    <custom-input
                        name="year_birth"
                        type="year"
                        required="true"
                        value="${this.data.year_birth}"
                    >Year birth
                    </custom-input>
                    <custom-input
                        name="number_employees"
                        type="number"
                        required="true"
                        value="${this.data.number_employees}"
                    >Number of employees
                    </custom-input>
                    <custom-input
                        name="web_site"
                        type="text"
                        value="${this.data.web_site}"
                    >Website
                    </custom-input>
                    <custom-input
                        name="linkedin"
                        type="text"
                        value="${this.data.linkedin}"
                    >Linkedin
                    </custom-input>
                    <custom-input
                        name="facebook"
                        type="text"
                        value="${this.data.facebook}"
                    >Facebook
                    </custom-input>
                    <custom-input
                        name="twitter"
                        type="text"
                        value="${this.data.twitter}"
                    >Twitter
                    </custom-input>
                    <custom-input
                        name="video"
                        type="text"
                        value="${this.data.video}"
                    >Video (link)
                    </custom-input>
                    <custom-input
                        name="description"
                        type="text"
                        value="${this.data.description}"
                    >Description
                    </custom-input>
                    <custom-input
                        name="logo"
                        type="file"
                        value="${this.data.logo}"
                    >Logo
                    </custom-input>
                    <custom-input
                        name="cover"
                        type="file"
                        value="${this.data.cover}"
                    >Cover
                    </custom-input>
                        <custom-btn
                            type="submit"
                            color="white"
                            margin="20px"
                        >Submit
                        </custom-btn>
                    </div>
                </form>
            </div>
            `
        }
        if (this.type === 'updateAnnouncement')
        {
            await this.getAllData();
            return `
            <div style="${this.style().form}">
                <form style="${this.style().formSign}">
                    <custom-select-company>
                    </custom-select-company>
                    <custom-input
                        name="job_name"
                        type="text"
                        required="true"
                        value="${this.data.job_name}"
                    >Job Name
                    </custom-input>
                    <custom-input
                        name="recruiter_id"
                        type="number"
                        required="true"
                        value="${userId}"
                        style="${this.style().none}"
                    ></custom-input>
                    <custom-select-activity>
                    </custom-select-activity>
                    <custom-select-contract>
                    </custom-select-contract>
                    <custom-input
                        name="localisation"
                        type="number"
                        required="true"
                        value="${this.data.localisation}"
                    >Localisation
                    </custom-input>
                    <custom-input
                        name="job_start"
                        type="date"
                        value="${this.data.job_start}"
                    >Job start
                    </custom-input>
                    <custom-input
                        name="job_description"
                        type="text"
                        value="${this.data.job_description}"
                    >job_description
                    </custom-input>
                    <custom-input
                        name="additional_information"
                        type="text"
                        value="${this.data.additional_information}"
                    >additional_information
                    </custom-input>
                    <custom-input
                        name="missions"
                        type="text"
                        value="${this.data.missions}"
                    >Missions
                    </custom-input>
                    <custom-input
                        name="profile"
                        type="text"
                        value="${this.data.profile}"
                    >Profile
                    </custom-input>
                    <custom-input
                        name="salary"
                        type="text"
                        value="${this.data.salary}"
                    >Salary
                    </custom-input>
                        <custom-btn
                            type="submit"
                            color="white"
                            margin="20px"
                        >Submit
                        </custom-btn>
                    </div>
                </form>
            </div>
            `
        }
        if (this.type === 'createAnnouncement')
        {
            return `
            <div style="${this.style().form}">
                <form style="${this.style().formSign}">
                    <custom-select-company>
                    </custom-select-company>
                    <custom-input
                        name="job_name"
                        type="text"
                        required="true"
                    >Job Name
                    </custom-input>
                    <custom-input
                        name="recruiter_id"
                        type="number"
                        required="true"
                        value="${userId}"
                        style="${this.style().none}"
                    ></custom-input>
                    <custom-select-activity>
                    </custom-select-activity>
                    <custom-select-contract>
                    </custom-select-contract>
                    <custom-input
                        name="localisation"
                        type="number"
                        required="true"
                    >Localisation
                    </custom-input>
                    <custom-input
                        name="job_start"
                        type="date"
                    >Job start
                    </custom-input>
                    <custom-input
                        name="job_description"
                        type="text"
                    >job_description
                    </custom-input>
                    <custom-input
                        name="additional_information"
                        type="text"
                    >additional_information
                    </custom-input>
                    <custom-input
                        name="missions"
                        type="text"
                    >Missions
                    </custom-input>
                    <custom-input
                        name="profile"
                        type="text"
                    >Profile
                    </custom-input>
                    <custom-input
                        name="salary"
                        type="text"
                    >Salary
                    </custom-input>
                        <custom-btn
                            type="submit"
                            color="white"
                            margin="20px"
                        >Submit
                        </custom-btn>
                    </div>
                </form>
            </div>
            `
        }
    }

    style() {
        const form = `
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            width: 100%;
            place-items: center;
            text-align: -webkit-center;
        `

        const formSign = `
            flex-wrap: wrap;
            display: flex;
            justify-content: center;
            padding: 30px;
            overflow: overlay;
        `

        const action = `
            flex-wrap: wrap;
            display: flex;
            justify-content: space-between;
            width: 100%;
        `

        const action2 = `
            margin: 30px;
            flex-wrap: wrap;
            display: flex;
            justify-content: space-between;
            width: 300px;
        `

        const h5 = `
            font-size: 30px;
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            margin: 25px;
            color: white;
        `

        const h6 = `
            font-size: 20px;
            font-family: 'Roboto', sans-serif;
            font-weight: 600;
            margin: 25px;
            color: white;
        `

        const p = `
            font-size: 15px;
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            color: white;
        `

        const none = `
            display: none;
        `

        return {
            form : form,
            formSign : formSign,
            action : action,
            action2 : action2,
            h5 : h5,
            h6 : h6,
            p : p,
            none : none
        }


    }

}
