export const AuthStr = sessionStorage.getItem('Authorization');
export const type = sessionStorage.getItem('type') || false;
export const userId = sessionStorage.getItem('userId') || false;

export const connected = true;

const baseURL = "http://127.0.0.1:8085/api"

export const urlApi = (firstId = '', secondId = '') => {
  return {
    // COMPANY
    company: `${baseURL}/company/`,
    companyId: `${baseURL}/company/${firstId}`,
    recruitersCompany: `${baseURL}/company/${firstId}/recruiters`,
    recruiterStatus: `${baseURL}/company/${firstId}/recruiters/${secondId}`,
    // JOBBER
    jobber: `${baseURL}/jobber/`,
    jobberId: `${baseURL}/jobber/${firstId}`,
    jobberApply: `${baseURL}/jobber/${firstId}/applyment`,
    // RECRUITERS
    recruiter: `${baseURL}/recruiter/`,
    recruiterId: `${baseURL}/recruiter/${firstId}`,
    companiesRecruiter: `${baseURL}/recruiter/${firstId}/companies`,
    applymentsRecruiter: `${baseURL}/recruiter/${firstId}/applyments`,
    // ANNOUNCEMENT
    announcement: `${baseURL}/announcement/`,
    announcementId: `${baseURL}/announcement/${firstId}`,
    applyments: `${baseURL}/announcement/${firstId}/applyment`,
    // APPLYMENT
    applyment: `${baseURL}/applyment/`,
    applymentId: `${baseURL}/applyment/${firstId}`,
    // LOGIN
    login: `${baseURL}/login/`,
    // CONSTANT
    area: `${baseURL}/constant/activity_area`,
    field: `${baseURL}/constant/activity_field`,
    contract: `${baseURL}/constant/contract`,
  };
};


export const urlApiSiren = (siren = '') => {
  return `https://entreprise.data.gouv.fr/api/sirene/v1/siren/${siren}`
};
