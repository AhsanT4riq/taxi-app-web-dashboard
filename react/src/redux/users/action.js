import {
  FETCHING_USER,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  FETCHING_ALL_USERS,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAILED,
  FETCHING_USER_STATS_CHARTS,
  FETCH_USER_STATS_CHARTS_SUCCESS,
  FETCH_USER_STATS_CHARTS_FAILED,
  CREATE_NEW_USER_REQ,
  CREATE_NEW_USER_REQ_SUCCESS,
  CREATE_NEW_USER_REQ_FAILED,
  CHANGE_PASSWORD_REQ,
  CHANGE_PASSWORD_REQ_SUCCESS,
  CHANGE_PASSWORD_REQ_FAILED
} from "./actionType";
import { reset } from "redux-form";
import UsersService from "../../services/users";



function fetchingAllUsers() {
  return {
    type: FETCHING_ALL_USERS
  };
}
function fetchAllUsersSuccess(data) {
  return {
    type: FETCH_ALL_USERS_SUCCESS,
    data
  };
}
function fetchAllUsersFailed(data) {
  return {
    type: FETCH_ALL_USERS_FAILED,
    data
  };
}
function fetchingUsers() {
  return {
    type: FETCHING_USER
  };
}

function fetchUsersSuccess(data) {
  return {
    type: FETCH_USERS_SUCCESS,
    data
  };
}

function fetchUsersFailed(data) {
  return {
    type: FETCH_USERS_FAILED,
    data
  };
}

function fetchingUsersStatusCharts() {
  return {
    type: FETCHING_USER_STATS_CHARTS
  };
}

function fetchUsersStatusChartsSuccess(data) {
  return {
    type: FETCH_USER_STATS_CHARTS_SUCCESS,
    data
  };
}

function fetchUsersStatusChartsFailed(data) {
  return {
    type: FETCH_USER_STATS_CHARTS_FAILED,
    data
  };
}

function RequestCreateNewUser() {
  return {
    type: CREATE_NEW_USER_REQ
  };
}

function RequestCreateNewUserSuccess(data) {
  return {
    type: CREATE_NEW_USER_REQ_SUCCESS,
    newUser: data
  };
}

function RequestCreateNewUserFailed(data) {
  return {
    type: CREATE_NEW_USER_REQ_FAILED,
    createUserErrorObj: data
  };
}

function RequestChangePassword() {
  return {
    type: CHANGE_PASSWORD_REQ
  };
}

function RequestChangePasswordSuccess(data) {
  return {
    type: CHANGE_PASSWORD_REQ_SUCCESS,
    newPas: data
  };
}

function  RequestChangePasswordFailed(data) {
  return {
    type: CHANGE_PASSWORD_REQ_FAILED,
    newPasErrorObj: data
  };
}

function fetchUsers(pageNo, userType) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(fetchingUsers());
    UsersService.getAllUsers(token, pageNo, userType)
      .then(response => {
        dispatch(fetchUsersSuccess(response));
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({ type: "FLUSH_DATA" });
        }
        dispatch(fetchUsersFailed(e));
      });
  };
}

function fetchAllUsers() {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(fetchingAllUsers());
    UsersService.getTotalUsers(token)
      .then(response => {
        dispatch(fetchAllUsersSuccess(response));
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({ type: "FLUSH_DATA" });
        }
        dispatch(fetchAllUsersFailed(e));
      });
  };
}

function fetchChartData() {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(fetchingUsersStatusCharts());
    UsersService.getUserChartStats(token)
      .then(response => {
        dispatch(fetchUsersStatusChartsSuccess(response));
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({ type: "FLUSH_DATA" });
        }
        dispatch(fetchUsersStatusChartsFailed(e));
      });
  };
}

function createNewUser(userObj) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(RequestCreateNewUser());
    UsersService.createUser(token, userObj)
      .then(response => {
        if (response.success) {
          dispatch(RequestCreateNewUserSuccess(response));
        }
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({ type: "FLUSH_DATA" });
        }
        dispatch(RequestCreateNewUserFailed(e));
        dispatch(reset("personalrider"));
        dispatch(reset("emergencycontactrider"));
        dispatch(reset("bankdriver"));
        dispatch(reset("licencedriver"));
        dispatch(reset("personaldriver"));
        dispatch(reset("vehicledriver"));
      });
  };
}

function changePassword(data) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    const email = getState().auth.user.user.email;
    const usertype = getState().auth.user.user.userType;
    data['email'] = email;
    data['userType'] = usertype;
    dispatch(RequestChangePassword());
    UsersService.changePassword(token, data)
      .then(response => {
        if (response.success) {
          dispatch(RequestChangePasswordSuccess(response));
          dispatch(reset("changepassword"));
        }
      })
      .catch(e => {
        dispatch(RequestChangePasswordFailed(e));
      });
  };
}

export default { fetchUsers, fetchChartData, createNewUser, fetchAllUsers, changePassword };
