import {
  FETCHING_TRIP_DETAILS,
  FETCH_TRIP_DETAIL_SUCCESS,
  FETCH_TRIP_DETAIL_FAILED,
  FETCHING_SPECIFIC_USER_TRIPS,
  FETCH_SPECIFIC_USER_TRIPS_SUCCESS,
  FETCH_SPECIFIC_USER_TRIPS_FAILED
} from "./actionTypes";

const initialState = {
  tripLoading: false,
  tripData: {}
};

export const tripDetails = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_TRIP_DETAILS:
      return {...state, tripLoading: true};
    case FETCH_TRIP_DETAIL_SUCCESS:
      return {...state, tripData: action.data, tripLoading: false};
    case FETCH_TRIP_DETAIL_FAILED:
      return {...state, tripLoading: false};
    case FETCHING_SPECIFIC_USER_TRIPS:
      return {...state, tripLoading: true};
    case FETCH_SPECIFIC_USER_TRIPS_SUCCESS:
      return {...state, tripData: action.data, tripLoading: false};
    case FETCH_SPECIFIC_USER_TRIPS_FAILED:
      return {...state, tripLoading: false};
    default:
      return state;
  }
};
