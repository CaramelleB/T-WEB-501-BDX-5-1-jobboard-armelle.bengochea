import { urlApi, AuthStr } from './url';

const headers = new Headers({
  'Authorization': `Bearer ${AuthStr}`,
  'Content-Type': 'application/json',
});

// LOGIN

// post
export const login = async data => {
  const req = await fetch(
    urlApi().login,
    {method: 'POST', mode: 'cors', headers: headers, body: JSON.stringify(data)}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// COMPANY

// get
export const getCompanies = async () => {
  const req = await fetch(
    urlApi().company,
    {method: 'GET', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

export const getCompanyById = async id => {
  const req = await fetch(
    urlApi(id).companyId,
    {method: 'GET', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

export const getRecruitersCompany = async id => {
  const req = await fetch(
    urlApi(id).recruitersCompany,
    {method: 'GET', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// post
export const createCompany = async data => {
  const req = await fetch(
    urlApi().company,
    {method: 'POST', mode: 'cors', headers: headers, body: JSON.stringify(data)}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// put
export const updateCompany = async (id, data) => {
  const req = await fetch(
    urlApi(id).companyId,
    {method: 'PUT', mode: 'cors', headers: headers, body: JSON.stringify(data)}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// delete
export const deleteCompany = async id => {
  const req = await fetch(
    urlApi(id).companyId,
    {method: 'DELETE', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// JOBBER

// get
export const getJobberById = async id => {
  const req = await fetch(
    urlApi(id).jobberId,
    {method: 'GET', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

export const getApplymentsJobber = async id => {
  const req = await fetch(
    urlApi(id).jobberApply,
    {method: 'GET', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// post
export const createJobber = async data => {
  const req = await fetch(
    urlApi().jobber,
    {method: 'POST', mode: 'cors', headers: headers, body: JSON.stringify(data)}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// put
export const updateJobber = async (id, data) => {
  const req = await fetch(
    urlApi(id).jobberId,
    {method: 'PUT', mode: 'cors', headers: headers, body: JSON.stringify(data)}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// delete
export const deleteJobber = async id => {
  const req = await fetch(
    urlApi(id).jobberId,
    {method: 'DELETE', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// RECRUITERS

// get
export const getRecruiters = async () => {
  const req = await fetch(
    urlApi().recruiter,
    {method: 'GET', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

export const getRecruiterById = async id => {
  const req = await fetch(
    urlApi(id).recruiterId,
    {method: 'GET', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

export const getCompRecruiter = async id => {
  const req = await fetch(
    urlApi(id).companiesRecruiter,
    {method: 'GET', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

export const getApplyRecruiter = async id => {
  const req = await fetch(
    urlApi(id).applymentsRecruiter,
    {method: 'GET', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// post
export const createRecruiter = async data => {
  console.log(data);
  const req = await fetch(
    urlApi().recruiter,
    {method: 'POST', mode: 'cors', headers: headers, body: JSON.stringify(data)}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// put
export const updateRecruiter = async (id, data) => {
  const req = await fetch(
    urlApi(id).recruiterId,
    {method: 'PUT', mode: 'cors', headers: headers, body: JSON.stringify(data)}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// delete
export const deleteRecruiter = async id => {
  const req = await fetch(
    urlApi(id).recruiterId,
    {method: 'DELETE', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// ANNOUNCEMENT

export const getAnnouncements = async () => {
  const req = await fetch(
    urlApi().announcement,
    {method: 'GET', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

export const getAnnouncementById = async id => {
  const req = await fetch(
    urlApi(id).announcementId,
    {method: 'GET', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

export const getApplyments = async id => {
  const req = await fetch(
    urlApi(id).applyments,
    {method: 'GET', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// post
export const createAnnouncement = async data => {
  const req = await fetch(
    urlApi().announcement,
    {method: 'POST', mode: 'cors', headers: headers, body: JSON.stringify(data)}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// put
export const updateAnnouncement = async (id, data) => {
  const req = await fetch(
    urlApi(id).announcementId,
    {method: 'PUT', mode: 'cors', headers: headers, body: JSON.stringify(data)}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// delete
export const deleteAnnouncement = async id => {
  const data = {deleted: true };
  console.log(data)
  const req = await fetch(
    urlApi(id).announcementId,
    {method: 'PATCH', mode: 'cors', headers: headers, body: JSON.stringify(data)}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// APPLYMENT

// get
export const getApplymentById = async id => {
  const req = await fetch(
    urlApi(id).applymentId,
    {method: 'GET', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// post
export const createApplyment = async data => {
  const req = await fetch(
    urlApi().applyment,
    {method: 'POST', mode: 'cors', headers: headers, body: JSON.stringify(data)}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// delete
export const deleteApplyment = async id => {
  const req = await fetch(
    urlApi(id).applymentId,
    {method: 'DELETE', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

// CONSTANT

// get
export const getArea = async () => {
  const req = await fetch(
    urlApi().area,
    {method: 'GET', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

export const getField = async () => {
  const req = await fetch(
    urlApi().field,
    {method: 'GET', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};

export const getContract = async () => {
  const req = await fetch(
    urlApi().contract,
    {method: 'GET', mode: 'cors', headers: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
  }
};
