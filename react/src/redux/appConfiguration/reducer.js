import {
  APP_CONFIGURATION_DETAILS,
  APP_CONFIGURATION_DETAILS_SUCCESS,
  APP_CONFIGURATION_DETAILS_FAILED,
  FETCHING_APP_CONFIG,
  FETCH_APP_CONFIG_SUCCESS,
  FETCH_APP_CONFIG_FAILED
} from "./actionType";

const initialState = {
  configData: {},
  configObj: {},
  loadingConfig: false,
  updateCofigLodaing: false,
  updateConfigErrorObj: {},
  failedUpdateConfig: false
};

export const configDetails = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_APP_CONFIG:
      return {
        ...state,
        updateCofigLodaing: true,
        loadingConfig: action.data === false ? action.data : true,
        failedUpdateConfig: false
      };
    case FETCH_APP_CONFIG_SUCCESS:
      return {
        ...state,
        configObj: action.data,
        updateCofigLodaing: false,
        loadingConfig: false,
        failedUpdateConfig: false
      };
    case FETCH_APP_CONFIG_FAILED:
      return {
        ...state,
        updateCofigLodaing: false,
        loadingConfig: false,
        failedUserListApi: true
      };
    case APP_CONFIGURATION_DETAILS:
      return {
        ...state,
        updateCofigLodaing: true,
        failedUpdateConfig: false,
        updateConfigErrorObj: {}
      };
    case APP_CONFIGURATION_DETAILS_SUCCESS:
      return {
        ...state,
        updateCofigLodaing: false,
        failedUpdateConfig: false,
        configData: action.newDetail,
        updateConfigErrorObj: {}
      };
    case APP_CONFIGURATION_DETAILS_FAILED:
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
