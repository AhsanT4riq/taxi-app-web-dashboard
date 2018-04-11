import {
  CLEAR_USER_DATA,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  SET_LOGGED_IN_STATUS,
  FLUSH_DATA,
  GPS_COORDS_SUCCESS,
  GPS_COORDS_FAILED
} from "./actionType";
import AuthService from "../../services/auth";

export const clearUser = () => {
  return {
    type: CLEAR_USER_DATA
  };
};

export const clearUserData = () => {
  return dispatch => {
    // AuthService.unsetCookie()
    //   .then(response => {
    //     if (response.success) {
    return dispatch(clearUser());
    //   }
    //   return dispatch(clearUser());
    // })
    // .catch(e => e);
  };
};
export const coordsSuccess = data => {
  return {
    type: GPS_COORDS_SUCCESS,
    data
  };
};
export const coordsFailed = data => {
  return {
    type: GPS_COORDS_FAILED,
    data
  };
};
export const loginUserSuccess = data => {
  return {
    type: LOGIN_USER_SUCCESS,
    data
  };
};

export const loginUserFailed = data => {
  return {
    type: LOGIN_USER_FAILED,
    data
  };
};

export const setLoggedInStatus = ({jwtAccessToken, loggedInStatus}) => {
  return {
    type: SET_LOGGED_IN_STATUS,
    jwtAccessToken,
    loggedInStatus
  };
};
export const setGPS = coords => {
  return (dispatch, getState) => {
    if (coords.latitude) {
      dispatch(coordsSuccess(coords));
    } else {
      dispatch(coordsFailed);
    }
  };
};
export const loginUser = userCredentials => {
  return (dispatch, getState) =>
    AuthService.loginUser(userCredentials)
      .then(response => {
        if (response.success) {
          AuthService.setCookie(response);
          dispatch(loginUserSuccess(response.data));
        } else {
          dispatch(loginUserFailed(response));
        }
      })
      .catch(e => {
        dispatch(loginUserFailed(e));
      });
};
