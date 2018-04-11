import {
  OPEN_MODAL,
  CLOSE_MODAL,
  UPDATING_TRIP_OBJECT,
  UPDATING_TRIP_OBJECT_SUCCESS,
  UPDATING_TRIP_OBJECT_FAILED
} from "./actionType";

const initialState = {
  showModal: false,
  tripObjectToUpdate: {},
  errorOnTripObjectUpdate: false,
  updateTripObjectLoading: false
};

export const updateTrip = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        showModal: action.modalStatus,
        tripObjectToUpdate: action.tripObj
      };
    case CLOSE_MODAL:
      return {...state, showModal: action.modalStatus, tripObjectToUpdate: {}};
    case UPDATING_TRIP_OBJECT:
      return {...state, updateTripObjectLoading: true};
    case UPDATING_TRIP_OBJECT_SUCCESS:
      return {...state, updateTripObjectLoading: false};
    case UPDATING_TRIP_OBJECT_FAILED:
      return {
        ...state,
        updateTripObjectLoading: false,
        errorOnTripObjectUpdate: true
      };
    default:
      return {...state};
  }
};
