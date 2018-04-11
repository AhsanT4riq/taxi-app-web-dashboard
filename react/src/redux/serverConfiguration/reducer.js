import {
  SERVER_CONFIGURATION_DETAILS,
  SERVER_CONFIGURATION_DETAILS_SUCCESS,
  SERVER_CONFIGURATION_DETAILS_FAILED,
  FETCHING_SERVER_CONFIG,
  FETCH_SERVER_CONFIG_SUCCESS,
  FETCH_SERVER_CONFIG_FAILED
} from "./actionType";

const initialState = {
  configData: {},
  configObj: {},
  loadingConfig: false,
  updateCofigLodaing: false,
  updateConfigErrorObj: {},
  failedUpdateConfig: false
};

export const serverconfigDetails = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_SERVER_CONFIG:
      return {
        ...state,
        updateCofigLodaing: true,
        loadingConfig: action.data === false ? action.data : true,
        failedUpdateConfig: false
      };
    case FETCH_SERVER_CONFIG_SUCCESS:
      return {
        ...state,
        configObj: action.data,
        updateCofigLodaing: false,
        loadingConfig: false,
        failedUpdateConfig: false
      };
    case FETCH_SERVER_CONFIG_FAILED:
      return {
        ...state,
        updateCofigLodaing: false,
        loadingConfig: false,
        failedUserListApi: true
      };
    case SERVER_CONFIGURATION_DETAILS:
      return {
        ...state,
        updateCofigLodaing: true,
        failedUpdateConfig: false,
        updateConfigErrorObj: {}
      };
    case SERVER_CONFIGURATION_DETAILS_SUCCESS:
      return {
        ...state,
        updateCofigLodaing: false,
        failedUpdateConfig: false,
        configData: action.newDetail,
        updateConfigErrorObj: {}
      };
    case SERVER_CONFIGURATION_DETAILS_FAILED:
      return {
        ...state,
        updateCofigLodaing: false,
        failedUpdateConfig: true,
        updateConfigErrorObj: action.createDetailErrorObj
      };
    default:
      return state;
  }
};
