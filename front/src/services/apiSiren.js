import { urlApiSiren } from './url';

const headers = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
});

export const getCompanyBySiren = async siren => {
  const req = await fetch(
    urlApiSiren(siren),
    {method: 'GET', mode: 'cors', header: headers}
  );
  if (req.ok) {
    let res = await req.json();
    return res
  } else {
    return ("HTTP-Error: " + req.status);
    
  }
};
