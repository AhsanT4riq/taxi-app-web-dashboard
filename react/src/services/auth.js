// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service
import ApiService from "./apiService";

// import config from './apiConfig';
// const API_ENDPOINT = `${config.serverUrl}:${config.port}`;

async function loginUser(userCredentials) {
  // const url = `${API_ENDPOINT}/api/auth/login`;
  // const response = await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(userCredentials),
  // });
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = false;
  apiObject.endpoint = "api/auth/loginadmin";
  apiObject.body = userCredentials;
  const response = await ApiService.callApi(apiObject);
  return response;
}

async function setCookie(data) {
  const url = "/setToken";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      jwtAccessToken: data.data.jwtAccessToken
    }),
    credentials: "same-origin"
  });
  return response;
}

async function unsetCookie() {
  const url = "/unsetToken";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  });
  return response;
}

export default {loginUser, setCookie, unsetCookie};
