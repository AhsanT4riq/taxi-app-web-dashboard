import {
  FETCHING_TRIPS,
  FETCH_TRIPS_SUCCESS,
  FETCH_TRIPS_FAILED,
  FETCH_REVENUE_GRAPH_DATA,
  FETCH_REVENUE_GRAPH_DATA_SUCCESS,
  FETCH_REVENUE_GRAPH_DATA_FAILED,
  FETCHING_ONGOINGTRIP_DRIVER_RIDER_DETAILS,
  FETCH_ONGOINGTRIP_DRIVER_RIDER_DETAILS_SUCCESS,
  FETCH_ONGOINGTRIP_DRIVER_RIDER_DETAILS_FAILED,
  FETCHING_RECENTREVIEWEDTRIP_DRIVER_RIDER_DETAILS,
  FETCH_RECENTREVIEWEDTRIP_DRIVER_RIDER_DETAILS_SUCCESS,
  FETCH_RECENTREVIEWEDTRIP_DRIVER_RIDER_DETAILS_FAILED,
  UPDATE_TRIP_LIST_OBJECT,
  CREATING_NEW_TRIP,
  CREATING_NEW_TRIP_SUCCESS,
  CREATING_NEW_TRIP_FAILED
} from "./actionType";

const initialState = {
  loading: true,
  tripList: {
    data: []
  },
  ongoingTripList: {
    data: []
  },
  recentReviewedTripList: {
    data: []
  },
  pageNo: 1,
  revenueGraphLoading: true,
  revenueGraphData: null,
  meta: null,
  tripFilter: "All",
  requestTripLoading: false,
  errorStatusCreateTripObj: false,
  newTripObj: {},
  errorTripObj: {}
};

export const trips = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_TRIPS:
      return {...state, loading: true, tripFilter: action.filter};
    case FETCH_TRIPS_SUCCESS:
      return {
        ...state,
        tripList: action.data,
        loading: false,
        meta: action.data.meta
      };
    case FETCH_TRIPS_FAILED:
      return {...state, loading: false};
    case FETCHING_ONGOINGTRIP_DRIVER_RIDER_DETAILS:
      return {...state, loading: true};
    case FETCH_ONGOINGTRIP_DRIVER_RIDER_DETAILS_SUCCESS:
      return {
        ...state,
        ongoingTripList: action.data,
        loading: false,
        meta: action.data.meta
      };
    case FETCH_ONGOINGTRIP_DRIVER_RIDER_DETAILS_FAILED:
      return {...state, loading: false};
    case FETCHING_RECENTREVIEWEDTRIP_DRIVER_RIDER_DETAILS:
      return {...state, loading: true};
    case FETCH_RECENTREVIEWEDTRIP_DRIVER_RIDER_DETAILS_SUCCESS:
      return {
        ...state,
        recentReviewedTripList: action.data,
        loading: false,
        meta: action.data.meta
      };
    case FETCH_RECENTREVIEWEDTRIP_DRIVER_RIDER_DETAILS_FAILED:
      return {...state, loading: false};
    case FETCH_REVENUE_GRAPH_DATA:
      return {...state, revenueGraphLoading: true};
    case FETCH_REVENUE_GRAPH_DATA_SUCCESS:
      return {
        ...state,
        revenueGraphLoading: false,
        revenueGraphData: action.data
      };
    case FETCH_REVENUE_GRAPH_DATA_FAILED:
      return {...state, revenueGraphLoading: false};
    case CREATING_NEW_TRIP:
      return {...state, requestTripLoading: true};
    case CREATING_NEW_TRIP_SUCCESS:
      return {
        ...state,
        requestTripLoading: false,
        newTripObj: action.newTripObj
      };
    case CREATING_NEW_TRIP_FAILED:
      return {
        ...state,
        requestTripLoading: false,
        errorTripObj: action.errorTripObj,
        errorStatusCreateTripObj: true
      };
    case UPDATE_TRIP_LIST_OBJECT: {
      const tripList = Object.assign({}, action.tripList);
      return {...state, tripList};
    }
    default:
      return state;
  }
};
