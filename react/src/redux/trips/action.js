import {
  FETCHING_ONGOINGTRIP_DRIVER_RIDER_DETAILS,
  FETCH_ONGOINGTRIP_DRIVER_RIDER_DETAILS_SUCCESS,
  FETCH_ONGOINGTRIP_DRIVER_RIDER_DETAILS_FAILED,
  FETCHING_RECENTREVIEWEDTRIP_DRIVER_RIDER_DETAILS,
  FETCH_RECENTREVIEWEDTRIP_DRIVER_RIDER_DETAILS_SUCCESS,
  FETCH_RECENTREVIEWEDTRIP_DRIVER_RIDER_DETAILS_FAILED,
  FETCHING_TRIPS,
  FETCH_TRIPS_SUCCESS,
  FETCH_TRIPS_FAILED,
  FETCH_REVENUE_GRAPH_DATA,
  FETCH_REVENUE_GRAPH_DATA_SUCCESS,
  FETCH_REVENUE_GRAPH_DATA_FAILED,
  CREATING_NEW_TRIP,
  CREATING_NEW_TRIP_SUCCESS,
  CREATING_NEW_TRIP_FAILED
} from "./actionType";

import TripService from "../../services/trip";

function fetchingTrip(filter) {
  return {
    type: FETCHING_TRIPS,
    filter
  };
}

function fetchingOngoingTripDetails() {
  return {
    type: FETCHING_ONGOINGTRIP_DRIVER_RIDER_DETAILS
  };
}

function fetchingRecentReviewedTripDetails() {
  return {
    type: FETCHING_RECENTREVIEWEDTRIP_DRIVER_RIDER_DETAILS
  };
}

function fetchOngoingTripDetailsSuccess(data) {
  return {
    type: FETCH_ONGOINGTRIP_DRIVER_RIDER_DETAILS_SUCCESS,
    data
  };
}

function fetchRecentReviewedTripDetailsSuccess(data) {
  return {
    type: FETCH_RECENTREVIEWEDTRIP_DRIVER_RIDER_DETAILS_SUCCESS,
    data
  };
}

function fetchTripSuccess(data) {
  return {
    type: FETCH_TRIPS_SUCCESS,
    data
  };
}

function fetchOngoingTripDetailsFailed(data) {
  return {
    type: FETCH_ONGOINGTRIP_DRIVER_RIDER_DETAILS_FAILED,
    data
  };
}

function fetchRecentReviewedTripDetailsFailed(data) {
  return {
    type: FETCH_RECENTREVIEWEDTRIP_DRIVER_RIDER_DETAILS_FAILED,
    data
  };
}

function fetchTripFailed(data) {
  return {
    type: FETCH_TRIPS_FAILED,
    data
  };
}

function fetchTripRevenue() {
  return {
    type: FETCH_REVENUE_GRAPH_DATA
  };
}

function fetchTripRevenueSuccess(data) {
  return {
    type: FETCH_REVENUE_GRAPH_DATA_SUCCESS,
    data
  };
}

function fetchTripRevenueFailed(data) {
  return {
    type: FETCH_REVENUE_GRAPH_DATA_FAILED,
    data
  };
}

function requestTripCreate() {
  return {
    type: CREATING_NEW_TRIP
  };
}

function requestTripCreateSuccess(data) {
  return {
    type: CREATING_NEW_TRIP_SUCCESS,
    newTripObj: data
  };
}
function requestTripCreateFailed(data) {
  return {
    type: CREATING_NEW_TRIP_FAILED,
    errorTripObj: data
  };
}

function fetchTrips(pageNo, filter) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(fetchingTrip(filter));
    TripService.getAllTripDetails(token, pageNo, filter)
      // .then((response) => {
      //   if (response.status === 401) {
      //     return dispatch({ type: 'FLUSH_DATA' });
      //   }
      //   return response.json();
      // })
      .then(response => {
        if (response.success) {
          dispatch(fetchTripSuccess(response));
        }
        // else {
        //   dispatch(fetchTripFailed(response));
        // }
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(fetchTripFailed(e));
      });
  };
}

function fetchOngoingTripDriverRiderDetails() {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(fetchingOngoingTripDetails());
    TripService.getAllOngoingTripDetails(token)
      .then(response => {
        if (response.success) {
          dispatch(fetchOngoingTripDetailsSuccess(response));
        }
        // else {
        //   dispatch(fetchTripFailed(response));
        // }
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(fetchOngoingTripDetailsFailed(e));
      });
  };
}

function fetchRecentReviewedTripDriverRiderDetails() {
  // new2.1
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(fetchingRecentReviewedTripDetails());
    TripService.getAllRecentReviewedTripDetails(token)
      .then(response => {
        if (response.success) {
          dispatch(fetchRecentReviewedTripDetailsSuccess(response));
        }
        // else {
        //   dispatch(fetchTripFailed(response));
        // }
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(fetchRecentReviewedTripDetailsFailed(e));
      });
  };
}

function fetctTripRevenueData(year = new Date().getFullYear()) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(fetchTripRevenue());
    TripService.getTripRevenueDetails(token, year)
      // .then((response) => {
      //   if (response.status === 401) {
      //     return dispatch({ type: 'FLUSH_DATA' });
      //   }
      //   return response.json();
      // })
      .then(response => {
        if (response.success) {
          dispatch(fetchTripRevenueSuccess(response));
        }
        //  else {
        //   dispatch(fetchTripRevenueFailed(response));
        // }
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(fetchTripRevenueFailed(e));
      });
  };
}

function createNewTrip(tripObj) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(requestTripCreate());
    TripService.createTrip(token, tripObj)
      .then(response => {
        dispatch(requestTripCreateSuccess(response));
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(requestTripCreateFailed(e));
      });
  };
}

export default {
  fetchTrips,
  fetctTripRevenueData,
  createNewTrip,
  fetchOngoingTripDriverRiderDetails,
  fetchRecentReviewedTripDriverRiderDetails
};
