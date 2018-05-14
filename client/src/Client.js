function search(query,cb) {
  return fetch(`/api/v1/all_category?q=${query}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function logIn(query, cb){
  return fetch(`/users/sign_in`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(setSession)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

function setSession(authResult){
  // Set the time that the access token will expire at
  let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);
  // navigate to the home route
  // history.replace('/');
}

const Client = { search, logIn };
export default Client;

