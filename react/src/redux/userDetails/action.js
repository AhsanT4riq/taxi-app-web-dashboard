import {
  FETCHING_USER_TRIP_DETAILS,
  FETCH_USER_TRIP_DETAIL_SUCCESS,
  FETCH_USER_TRIP_DETAIL_FAILED,
  FETCHING_USER_DETAILS,
  FETCH_USER_DETAIL_SUCCESS,
  FETCH_USER_DETAIL_FAILED,
  FETCHING_ACTIVEDRIVERS_DETAILS,
  FETCH_ACTIVEDRIVERS_DETAILS_SUCCESS,
  FETCH_ACTIVEDRIVERS_DETAILS_FAILED,
  FETCHING_ACTIVECUSTOMERS_DETAILS,
  FETCH_ACTIVECUSTOMERS_DETAILS_SUCCESS,
  FETCH_ACTIVECUSTOMERS_DETAILS_FAILED,
  FETCHING_APPROVE_PENDING_USERS,
  FETCH_APPROVE_PENDING_USERS_SUCCESS,
  FETCH_APPROVE_PENDING_USERS_FAILED,
  APPROVING_SELECTED_USER,
  APPROVING_SELECTED_USER_SUCCESS,
  APPROVING_SELECTED_USER_FAILED,
  REJECTING_SELECTED_USER,
  REJECTING_SELECTED_USER_SUCCESS,
  REJECTING_SELECTED_USER_FAILED
} from "./actionType";
import UserDetailService from "../../services/userDetails";

function fetchingUserTrips() {
  return {
    type: FETCHING_USER_TRIP_DETAILS
  };
}

function fetchUserTripsSuccess(data) {
  return {
    type: FETCH_USER_TRIP_DETAIL_SUCCESS,
    data
  };
}

function fetchUserTripsFailed(data) {
  return {
    type: FETCH_USER_TRIP_DETAIL_FAILED,
    data
  };
}
// for user deatils
function fetchingUserDetails() {
  return {
    type: FETCHING_USER_DETAILS
  };
}

function fetchUserDetailsSuccess(data) {
  return {
    type: FETCH_USER_DETAIL_SUCCESS,
    data
  };
}

function fetchUserDetailsFailed(data) {
  return {
    type: FETCH_USER_DETAIL_FAILED,
    data
  };
}
// fro active driver details
function fetchingActiveDriversDetails() {
  return {
    type: FETCHING_ACTIVEDRIVERS_DETAILS
  };
}

function fetchActiveDriversDetailsSuccess(data) {
  return {
    type: FETCH_ACTIVEDRIVERS_DETAILS_SUCCESS,
    data
  };
}

function fetchActiveDriversDetailsFailed(data) {
  return {
    type: FETCH_ACTIVEDRIVERS_DETAILS_FAILED,
    data
  };
}
// fro active customer details
function fetchingActiveCustomerDetails() {
  return {
    type: FETCHING_ACTIVECUSTOMERS_DETAILS
  };
}
function fetchActiveCustomersDetailsSuccess(data) {
  return {
    type: FETCH_ACTIVECUSTOMERS_DETAILS_SUCCESS,
    data
  };
}
function fetchActiveCustomersDetailsFailed(data) {
  return {
    type: FETCH_ACTIVECUSTOMERS_DETAILS_FAILED,
    data
  };
}
function fetchingApprovePendingUsers() {
  return {
    type: FETCHING_APPROVE_PENDING_USERS
  };
}

function fetchApprovePendingUsersSuccess(data) {
  return {
    type: FETCH_APPROVE_PENDING_USERS_SUCCESS,
    data
  };
}
function fetchApprovePendingUsersFailed(data) {
  return {
    type: FETCH_APPROVE_PENDING_USERS_FAILED,
    data
  };
}

function approvingSelectedUser() {
  return {
    type: APPROVING_SELECTED_USER
  };
}
function approvingSelectedUserSuccess(data) {
  return {
    type: APPROVING_SELECTED_USER_SUCCESS,
    data
  };
}
function approvingSelectedUserFailed(data) {
  return {
    type: APPROVING_SELECTED_USER_FAILED,
    data
  };
}

function rejectingSelectedUser() {
  return {
    type: REJECTING_SELECTED_USER
  };
}
function rejectingSelectedUserSuccess(data) {
  return {
    type: REJECTING_SELECTED_USER_SUCCESS,
    data
  };
}
function rejectingSelectedUserfailed(data) {
  return {
    type: REJECTING_SELECTED_USER_FAILED,
    data
  };
}

function fetchActiveDrivers() {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(fetchingActiveDriversDetails());
    UserDetailService.getActiveDriversDetails(token) // 99999
      .then(response => {
        console.log('fetchActionDriver',response)
        if (response.success) {
          dispatch(fetchActiveDriversDetailsSuccess(response));
        } else {
          dispatch(fetchActiveDriversDetailsFailed(response));
        }
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(fetchActiveDriversDetailsFailed(e));
      });
  };
}

function fetchApprovePendingUsers(userType) {
  // /svjshvhjsv
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(fetchingApprovePendingUsers());
    UserDetailService.getApprovePendingUsers(token, userType) // 99999
      .then(response => {
        if (response) {
          dispatch(fetchApprovePendingUsersSuccess(response));
        }
        //  else {
        //   dispatch(fetchUserDetailsFailed(response));
        // }
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(fetchApprovePendingUsersFailed(e));
      });
  };
}

function fetchActiveCustomers() {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(fetchingActiveCustomerDetails());
    UserDetailService.getActiveCustomersDetails(token)
      .then(response => {
        if (response.success) {
          dispatch(fetchActiveCustomersDetailsSuccess(response));
        }
        //  else {
        //   dispatch(fetchUserDetailsFailed(response));
        // }
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(fetchActiveCustomersDetailsFailed(e));
      });
  };
}

function fetchUserDetails(id) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(fetchingUserDetails());
    UserDetailService.getUserDetail(token, id)
      // .then((response) => {
      //   if (response.status === 401) {
      //     return (dispatch, getState)({ type: 'FLUSH_DATA' });
      //   }
      //   return response.json();
      // })
      .then(response => {
        if (response.success) {
          dispatch(fetchUserDetailsSuccess(response));
        }
        //  else {
        //   dispatch(fetchUserDetailsFailed(response));
        // }
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(fetchUserDetailsFailed(e));
      });
  };
}

function approveSelectedUser(id, userType) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(approvingSelectedUser());
    UserDetailService.approveSelectedPendingUser(token, id)
      .then(response => {
        if (response.success) {
          dispatch(approvingSelectedUserSuccess(response));
          dispatch(fetchApprovePendingUsers(userType));
        }
        // else {
        //   dispatch(fetchUserTripsFailed(response));
        // }
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(approvingSelectedUserFailed(e));
      });
  };
}

function rejectSelectedUser(id, userType) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(rejectingSelectedUser());
    UserDetailService.rejectSelectedPendingUser(token, id)
      .then(response => {
        if (response.success) {
          dispatch(rejectingSelectedUserSuccess(response));
          dispatch(fetchApprovePendingUsers(userType));
        }
        // else {
        //   dispatch(fetchUserTripsFailed(response));
        // }
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(rejectingSelectedUserfailed(e));
      });
  };
}

function fetchTripDetails(id, pageNo) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(fetchingUserTrips());
    UserDetailService.getLastFiveRideDetails(token, id, pageNo)
      // .then((response) => {
      //   if (response.status === 401) {
      //     return dispatch({ type: 'FLUSH_DATA' });
      //   }
      //   return response.json();
      // })
      .then(response => {
        if (response.success) {
          dispatch(fetchUserTripsSuccess(response));
        }
        // else {
        //   dispatch(fetchUserTripsFailed(response));
        // }
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(fetchUserTripsFailed(e));
      });
  };
}

export default {
  rejectSelectedUser,
  approveSelectedUser,
  fetchApprovePendingUsers,
  fetchActiveDrivers,
  fetchUserDetails,
  fetchTripDetails,
  fetchActiveCustomers
};
