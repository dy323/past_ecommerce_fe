import axios from "axios";

//Credential 
const oauth_url = process.env.REACT_APP_KARDBYS_BASE_URL;

const base_url = process.env.REACT_APP_DASHBOARD_MAISHAH_URL;

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//Auth
export function authPost(url, data) {
  return instance.post(oauth_url + url, data).catch((err) => {
    console.log(err);
  })
}


//get details called from yanxuan
export function get(url) {
  return instance.get(base_url + url).catch((err) => {
    alert(err);
  });
}

//get data that specific for the logged in ( need to use token to verify )
export function getWithAuthorization(url) {
  const token = "access_token_here";
  return instance
    .get(base_url + url, {
      headers: { Authorization: "Bearer " + token },
    })
    .catch((err) => {
      alert(err);
    });
}

//post and get callback from api that called from yan xuan
export function post(url, data) {
  return instance.post(base_url + url, data).catch((err) => {
    alert(err);
  });
}

//post data for logged in user ( need to use token to verify)
export function postWithAuthorization(url, data, param = null) {
  const token = "access_token";
  return instance
    .post(base_url + url, data, {
      headers: { Authorization: "Bearer " + token },
    })
    .catch((err) => {
      alert(err);
    });
}

//Error Handling
export function erroHandler() {}
