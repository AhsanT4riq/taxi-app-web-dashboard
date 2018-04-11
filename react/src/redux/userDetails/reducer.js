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

const initialState = {
  loading: true,
  tripLoading: true,
  currentUserTrips: {
    data: []
  },
  activeCustomersList: {},
  activeDriversList: {},
  currentUserDetails: {},
  approvePendingUsers: {},
  userApprovalInfo: {}
};
export const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER_TRIP_DETAILS:
      return {...state, tripLoading: true};
    case FETCH_USER_TRIP_DETAIL_SUCCESS:
      return {
        ...state,
        currentUserTrips: action.data,
        tripLoading: false,
        meta: action.data.meta
      };
    case FETCH_USER_TRIP_DETAIL_FAILED:
      return {...state, tripLoading: false};
    case FETCHING_USER_DETAILS:
      return {...state, loading: true};
    case FETCH_USER_DETAIL_SUCCESS:
      return {...state, currentUserDetails: action.data, loading: false};
    case FETCH_USER_DETAIL_FAILED:
      return {...state, loading: false};
    case FETCHING_ACTIVEDRIVERS_DETAILS:
      return {...state, loading: true};
    case FETCH_ACTIVEDRIVERS_DETAILS_SUCCESS:
      return {
        ...state,
        activeDriversList: action.data,
        loading: false
      };
    case FETCH_ACTIVEDRIVERS_DETAILS_FAILED:
      return {...state, loading: false};
    case FETCHING_ACTIVECUSTOMERS_DETAILS:
      return {...state, loading: true};
    case FETCH_ACTIVECUSTOMERS_DETAILS_SUCCESS:
      return {
        ...state,
        activeCustomersList: action.data,
        loading: false
      };
    case FETCH_ACTIVECUSTOMERS_DETAILS_FAILED:
      return {...state, loading: false};
    case FETCHING_APPROVE_PENDING_USERS:
      return {...state, loading: true};
    case FETCH_APPROVE_PENDING_USERS_SUCCESS:
      return {
        ...state,
        approvePendingUsers: action.data,
        loading: false
      };
    case FETCH_APPROVE_PENDING_USERS_FAILED:
      return {...state, loading: false};
    case APPROVING_SELECTED_USER:
      return {...state, loading: true};
    case APPROVING_SELECTED_USER_SUCCESS:
      return {
        ...state,
        userApprovalInfo: action.data,
        loading: false
      };
    case APPROVING_SELECTED_USER_FAILED:
      return {...state, loading: false};
    case REJECTING_SELECTED_USER:
      return {...state, loading: true};
    case REJECTING_SELECTED_USER_SUCCESS:
      return {
        ...state,
        userApprovalInfo: action.data,
        loading: false
      };
    case REJECTING_SELECTED_USER_FAILED:
      return {...state, loading: false};
    default:
      return state;
  }
};
