import ApiService from "./apiService";

async function getTripDetail(token, id) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = token;
  apiObject.endpoint = `api/admin/trip/${id}`;
  const response = await ApiService.callApi(apiObject);
  return response;
}
async function getSpecificUserTripDetails(token, id) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = token;
  apiObject.endpoint = `api/admin/specificusertrips/${id}`;
  const response = await ApiService.callApi(apiObject);
  return response;
}
export default {getTripDetail, getSpecificUserTripDetails};
