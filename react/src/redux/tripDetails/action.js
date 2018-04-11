import {
  FETCHING_TRIP_DETAILS,
  FETCH_TRIP_DETAIL_SUCCESS,
  FETCH_TRIP_DETAIL_FAILED,
  FETCHING_SPECIFIC_USER_TRIPS,
  FETCH_SPECIFIC_USER_TRIPS_SUCCESS,
  FETCH_SPECIFIC_USER_TRIPS_FAILED
} from "./actionTypes";
import TripDetailService from "../../services/tripDetails";

// for trip deatils
function fetchingTripDetails() {
  return {
    type: FETCHING_TRIP_DETAILS
  };
}

function fetchTripDetailsSuccess(data) {
  return {
    type: FETCH_TRIP_DETAIL_SUCCESS,
    data
  };
}

function fetchTripDetailsFailed(data) {
  return {
    type: FETCH_TRIP_DETAIL_FAILED,
    data
  };
}
// for specific user trips
function fetchingSpeficUserTripDetails() {
  return {
    type: FETCHING_SPECIFIC_USER_TRIPS
  };
}
function fetchSpecificUserTripsSuccess(data) {
  return {
    type: FETCH_SPECIFIC_USER_TRIPS_SUCCESS,
    data
  };
}
function fetchSpecificUserTripsFailed(data) {
  return {
    type: FETCH_SPECIFIC_USER_TRIPS_FAILED,
    data
  };
}

function fetchTripDetails(id) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(fetchingTripDetails());
    TripDetailService.getTripDetail(token, id)
      // .then((response) => {
      //   if (response.status === 401) {
      //     return dispatch({ type: 'FLUSH_DATA' });
      //   }
      //   return response.json();
      // })
      .then(response => {
        if (response.success) {
          dispatch(fetchTripDetailsSuccess(response.data));
        }
        // else {
        //   dispatch(fetchTripDetailsFailed(response));
        // }
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(fetchTripDetailsFailed(e));
      });
  };
}

function fetchSpecificUserTrips(id) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(fetchingSpeficUserTripDetails());
    TripDetailService.getSpecificUserTripDetails(token, id)
      .then(response => {
        if (response.success) {
          dispatch(fetchSpecificUserTripsSuccess(response.data));
        }
        // else {
        //   dispatch(fetchTripDetailsFailed(response));
        // }
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(fetchSpecificUserTripsFailed(e));
      });
  };
}

export default {fetchTripDetails, fetchSpecificUserTrips};
