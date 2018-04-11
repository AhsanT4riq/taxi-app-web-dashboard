import {
  APP_CONFIGURATION_DETAILS,
  APP_CONFIGURATION_DETAILS_SUCCESS,
  APP_CONFIGURATION_DETAILS_FAILED,
  FETCHING_APP_CONFIG,
  FETCH_APP_CONFIG_SUCCESS,
  FETCH_APP_CONFIG_FAILED
} from "./actionType";
import AppConfigService from "../../services/appConfig";


function fetchingAppConfig(data) {
  return {
    type: FETCHING_APP_CONFIG,
    data
  };
}

function fetchAppConfigSuccess(data) {
  return {
    type: FETCH_APP_CONFIG_SUCCESS,
    data
  };
}
function fetchAppConfigFailed(data) {
  return {
    type: FETCH_APP_CONFIG_FAILED,
    data
  };
}
function RequestAppConfigureDetails() {
  return {
    type: APP_CONFIGURATION_DETAILS
  };
}

function RequestAppConfigureDetailsSuccess(data) {
  return {
    type: APP_CONFIGURATION_DETAILS_SUCCESS,
    newDetail: data
  };
}

function RequestAppConfigureDetailsFailed(data) {
  return {
    type: APP_CONFIGURATION_DETAILS_FAILED,
    createDetailErrorObj: data
  };
}
function fetchAppConfig(loading) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(fetchingAppConfig(loading));
    AppConfigService.getConfig(token)
      .then(response => {
        dispatch(fetchAppConfigSuccess(response));
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(fetchAppConfigFailed(e));
      });
  };
}
function createAppConfig(userObj) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(RequestAppConfigureDetails());
    AppConfigService.updateConfig(token, userObj)
      .then(response => {
        dispatch(RequestAppConfigureDetailsSuccess(response));
        dispatch(fetchAppConfig(false));
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(RequestAppConfigureDetailsFailed(e));
      });
  };
}

export default {createAppConfig, fetchAppConfig};
