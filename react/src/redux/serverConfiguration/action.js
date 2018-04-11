import {
  SERVER_CONFIGURATION_DETAILS,
  SERVER_CONFIGURATION_DETAILS_SUCCESS,
  SERVER_CONFIGURATION_DETAILS_FAILED,
  FETCHING_SERVER_CONFIG,
  FETCH_SERVER_CONFIG_SUCCESS,
  FETCH_SERVER_CONFIG_FAILED
} from "./actionType";
import ServerCofigService from "../../services/serverConfig";

function fetchingServerConfig(data) {
  return {
    type: FETCHING_SERVER_CONFIG,
    data
  };
}

function fetchServerConfigSuccess(data) {
  return {
    type: FETCH_SERVER_CONFIG_SUCCESS,
    data
  };
}
function fetchServerConfigFailed(data) {
  return {
    type: FETCH_SERVER_CONFIG_FAILED,
    data
  };
}
function RequestServerConfigureDetails() {
  return {
    type: SERVER_CONFIGURATION_DETAILS
  };
}

function RequestServerConfigureDetailsSuccess(data) {
  return {
    type: SERVER_CONFIGURATION_DETAILS_SUCCESS,
    newDetail: data
  };
}

function RequestServerConfigureDetailsFailed(data) {
  return {
    type: SERVER_CONFIGURATION_DETAILS_FAILED,
    createDetailErrorObj: data
  };
}
function fetchServerConfig(loading) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(fetchingServerConfig(loading));
    ServerCofigService.getConfig(token)
      .then(response => {
        dispatch(fetchServerConfigSuccess(response));
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(fetchServerConfigFailed(e));
      });
  };
}
function createServerConfig(userObj) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(RequestServerConfigureDetails());
    ServerCofigService.updateConfig(token, userObj)
      .then(response => {
        dispatch(RequestServerConfigureDetailsSuccess(response));
        dispatch(fetchServerConfig(false));
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(RequestServerConfigureDetailsFailed(e));
      });
  };
}

export default {createServerConfig, fetchServerConfig};
