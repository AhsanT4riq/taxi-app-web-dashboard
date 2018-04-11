import {
  CLEAR_USER_DATA,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  SET_LOGGED_IN_STATUS,
  FLUSH_DATA,
  GPS_COORDS_SUCCESS,
  GPS_COORDS_FAILED
} from "./actionType";

const initialState = {
  user: {},
  invalidCreatential: false,
  loggedInStatus: false
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case "persist/REHYDRATE":
      return {...state, persistedState: action.payload};
    case FLUSH_DATA:
      return {...initialState};
    case GPS_COORDS_SUCCESS:
      return {
        ...state,
        coords: action.data
      };
    case GPS_COORDS_FAILED:
      return {
        state
      };
    case CLEAR_USER_DATA:
      return {...initialState, loggedInStatus: false};
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.data,
        admin: action.user,
        invalidCreatential: false,
        loggedInStatus: true
      };
    case LOGIN_USER_FAILED:
      return {
        ...state,
        user: action.data,
        invalidCreatential: true,
        loggedInStatus: false
      };
    // case SET_LOGGED_IN_STATUS: {
    //   const newState = Object.assign({}, state);
    //   newState.user.jwtAccessToken = action.jwtAccessToken;
    //   return {
    //     ...newState,
    //     loggedInStatus: action.loggedInStatus,
    //     invalidCreatential: false
    //   };
    // }
    default:
      return state;
  }
};
