import ApiService from "./apiService";


async function getLastFiveRideDetails(token, id, pageNo = 1) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = token;
  apiObject.endpoint = `api/admin/trip/user/${id}?pageNo=${pageNo}`;
  const response = await ApiService.callApi(apiObject);
  return response;
}
async function getUserDetail(token, id) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = token;
  apiObject.endpoint = `api/admin/userDetails/${id}`;
  const response = await ApiService.callApi(apiObject);
  return response;
}
async function getActiveDriversDetails(token) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = token;
  apiObject.endpoint = "api/admin/activeDriverDetails";
  const response = await ApiService.callApi(apiObject);
  // console.log('activeDrivers', response)
  return response;
}
async function getActiveCustomersDetails(token) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = token;
  apiObject.endpoint = "api/admin/activeCustomerDetails";
  const response = await ApiService.callApi(apiObject);
  return response;
}
async function getApprovePendingUsers(token, userType) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = token;
  apiObject.endpoint = `api/admin/approvePendingUsers/?userType=${userType}`; // new
  const response = await ApiService.callApi(apiObject);
  return response;
}
async function approveSelectedPendingUser(token, id) {
  const apiObject = {};
  apiObject.method = "PUT";
  apiObject.authentication = token;
  apiObject.endpoint = `api/admin/approveUser/?id=${id}`;
  const response = await ApiService.callApi(apiObject);
  return response;
}
async function rejectSelectedPendingUser(token, id) {
  const apiObject = {};
  apiObject.method = "PUT";
  apiObject.authentication = token;
  apiObject.endpoint = `api/admin/rejectUser/?id=${id}`;
  const response = await ApiService.callApi(apiObject);
  return response;
}
export default {
  getLastFiveRideDetails,
  getUserDetail,
  getActiveDriversDetails,
  getActiveCustomersDetails,
  getApprovePendingUsers,
  approveSelectedPendingUser,
  rejectSelectedPendingUser
};
