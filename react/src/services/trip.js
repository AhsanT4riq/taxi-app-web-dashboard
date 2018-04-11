import ApiService from "./apiService";

async function getAllTripDetails(token, pageNo, filter) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = token;
  apiObject.endpoint = `api/admin/trip?pageNo=${pageNo}&&filter=${filter}`;
  const response = await ApiService.callApi(apiObject);
  return response;
}

async function getTripRevenueDetails(token, year) {
  let revenueYear = year;
  revenueYear = year ? revenueYear : new Date().getFullYear();
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = token;
  apiObject.endpoint = `api/admin/trip/charts/${revenueYear}`;
  const response = await ApiService.callApi(apiObject);
  return response;
}

async function getAllOngoingTripDetails(token) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = token;
  apiObject.endpoint = "api/admin/ongoingtrips";
  const response = await ApiService.callApi(apiObject);
  return response;
}
async function getAllRecentReviewedTripDetails(token) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = token;
  apiObject.endpoint = "api/admin/recentreviewedtrips";
  const response = await ApiService.callApi(apiObject);
  return response;
}
async function updateTripObject(token, obj) {
  const apiObject = {};
  apiObject.method = "PUT";
  apiObject.authentication = token;
  apiObject.endpoint = "api/admin/trip/";
  apiObject.body = obj;
  const response = await ApiService.callApi(apiObject);
  return response;
}

async function createTrip(token, tripObj) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = token;
  apiObject.endpoint = "api/admin/trip";
  apiObject.body = tripObj;
  const response = await ApiService.callApi(apiObject);
  return response;
}

export default {
  getAllTripDetails,
  getTripRevenueDetails,
  getAllOngoingTripDetails,
  getAllRecentReviewedTripDetails,
  updateTripObject,
  createTrip
};
