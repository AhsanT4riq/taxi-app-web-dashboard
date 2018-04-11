import {
  FETCHING_USER,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  FETCHING_ALL_USERS,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAILED,
  FETCH_USER_STATS_CHARTS_SUCCESS,
  FETCH_USER_STATS_CHARTS_FAILED,
  FETCHING_USER_STATS_CHARTS,
  CREATE_NEW_USER_REQ,
  CREATE_NEW_USER_REQ_SUCCESS,
  CREATE_NEW_USER_REQ_FAILED,
  UPDATE_USER_LIST_OBJECT,
  CHANGE_PASSWORD_REQ,
  CHANGE_PASSWORD_REQ_SUCCESS,
  CHANGE_PASSWORD_REQ_FAILED
} from "./actionType";

const initialState = {
  loading: false,
  failedUserListApi: false,
  failedUserChartApi: false,
  userList: {},
  allUsersList: {},
  meta: null,
  chartData: {},
  chartLoading: true,
  newUserLoading: false,
  failedCreateUserApi: false,
  createUserErrorObj: {},
  newUserObj: {success: false, message: ""},
  changePwdObj: {success: false, message: ""},
  failedChangePassword: false,
  successChangePassword: false
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER:
      return {...state, loading: true, failedUserListApi: false};
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        userList: action.data,
        loading: false,
        failedUserListApi: false,
        meta: action.data.meta
      };
    case FETCH_USERS_FAILED:
      return {...state, loading: false, failedUserListApi: true};
    case FETCHING_ALL_USERS:
      return {...state, loading: false, failedUserListApi: true};
    case FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsersList: action.data,
        loading: false,
        failedUserListApi: false,
        meta: action.data.meta
      };
    case FETCH_ALL_USERS_FAILED:
      return {...state, loading: false, failedUserListApi: true};
    case FETCHING_USER_STATS_CHARTS:
      return {...state, chartLoading: true, failedUserChartApi: false};
    case FETCH_USER_STATS_CHARTS_SUCCESS:
      return {
        ...state,
        chartLoading: false,
        chartData: action.data,
        failedUserChartApi: false
      };
    case FETCH_USER_STATS_CHARTS_FAILED:
      return {...state, chartLoading: false, failedUserChartApi: true};
    case CHANGE_PASSWORD_REQ:
       return {
        ...state,
         failedChangePassword: false,
         successChangePassword: false,
         changePwdObj: {success: false, message: ""},
      };
    case CHANGE_PASSWORD_REQ_SUCCESS:
       return {
        ...state,
         failedChangePassword: false,
         successChangePassword: true,
         changePwdObj: action.newPas,
      };
    case CHANGE_PASSWORD_REQ_FAILED:
       return {
        ...state,
         failedChangePassword: true,
         successChangePassword: false,
         changePwdObj: action.newPasErrorObj,
      };
    case CREATE_NEW_USER_REQ:
      return {
        ...state,
        newUserLoading: true,
        failedCreateUserApi: false,
        newUserObj: {success: false, message: ""},
        createUserErrorObj: {}
      };
    case CREATE_NEW_USER_REQ_SUCCESS:
      return {
        ...state,
        newUserLoading: false,
        failedCreateUserApi: false,
        newUserObj: {success: true, message: "User Created sucessfully"},
        createUserErrorObj: {}
      };
    case CREATE_NEW_USER_REQ_FAILED:
      return {
        ...state,
        newUserLoading: false,
        failedCreateUserApi: true,
        createUserErrorObj: action.createUserErrorObj,
        newUserObj: {success: false, message: ""}
      };
    case UPDATE_USER_LIST_OBJECT: {
      const userList = Object.assign({}, action.userList);
      return {...state, userList};
    }
    default:
      return state;
  }
};
