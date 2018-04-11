import ApiService from "./apiService";

async function getAllUsers(token, pageNo, userType) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = token;
  apiObject.endpoint = `api/admin/user?pageNo=${pageNo}&&userType=${userType}`;
  const response = await ApiService.callApi(apiObject);
  return response;
}

async function getTotalUsers(token) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = token;
  apiObject.endpoint = "api/admin/allusers";
  const response = await ApiService.callApi(apiObject);
  return response;
}
async function getUserChartStats(token) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = token;
  apiObject.endpoint = "api/admin/user/userStatsChart";
  const response = await ApiService.callApi(apiObject);
  return response;
}

async function createUser(token, userObj) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = token;
  apiObject.body = userObj;
  apiObject.endpoint = "api/admin/user";
  const response = await ApiService.callApi(apiObject);
  return response;
}

async function changePassword(token, data) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = token;
  apiObject.body = data;
  apiObject.endpoint = "api/admin/changepassword";
  const response = await ApiService.callApi(apiObject);
  return response;
}

async function updateUserDetails(token, userObj) {
  const apiObject = {};
  apiObject.method = "PUT";
  apiObject.authentication = token;
  apiObject.body = userObj;
  apiObject.endpoint = "api/admin/user";
  const response = await ApiService.callApi(apiObject);
  return response;
}
export default {
  getAllUsers,
  getUserChartStats,
  createUser,
  updateUserDetails,
  getTotalUsers,
  changePassword
};
