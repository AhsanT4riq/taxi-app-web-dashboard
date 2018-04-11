import httpStatus from "http-status";
import apiConfig from "./apiConfig";
import fetch from "../utils/fetch";


async function callApi(apiObject) {
  const fetchObject = {};
  fetchObject.method = apiObject.method ? apiObject.method : "GET";
  if (fetchObject.method !== 'GET'){
   fetchObject.body = apiObject.body ? JSON.stringify(apiObject.body) : {};
 }
  fetchObject.headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (apiObject.authentication) {
    fetchObject.headers.Authorization = apiObject.authentication;
  }
  const url = `${apiConfig.serverUrl}:${apiConfig.port}/${apiObject.endpoint}`;
  const fetchResult = await fetch(url, fetchObject);
  return new Promise(async (resolve, reject) => {
    if (
      fetchResult.status >= httpStatus.OK &&
      fetchResult.status <= httpStatus.MULTIPLE_CHOICES
    ) {
      return resolve(fetchResult.json());
    }
    const errorResponse = await fetchResult.json();
    return reject(errorResponse);
  });
}

export default {callApi};
