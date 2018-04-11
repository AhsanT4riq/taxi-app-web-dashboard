import {
  OPEN_MODAL,
  CLOSE_MODAL,
  UPDATING_TRIP_OBJECT,
  UPDATING_TRIP_OBJECT_SUCCESS,
  UPDATING_TRIP_OBJECT_FAILED
} from "./actionType";

import {UPDATE_TRIP_LIST_OBJECT} from "../trips/actionType";

import TripService from "../../../../src/services/trip";

function openModal(tripObj) {
  return {
    type: OPEN_MODAL,
    modalStatus: true,
    tripObj
  };
}
function closeModal() {
  return {
    type: CLOSE_MODAL,
    modalStatus: false
  };
}

function updatingTripObject() {
  return {
    type: UPDATING_TRIP_OBJECT
  };
}

function updatingTripObjectSuccess() {
  return {
    type: UPDATING_TRIP_OBJECT_SUCCESS
  };
}
function updatingTripObjectFailed() {
  return {
    type: UPDATING_TRIP_OBJECT_FAILED
  };
}

function updateTripList(tripListObject) {
  return {
    type: UPDATE_TRIP_LIST_OBJECT,
    tripList: tripListObject
  };
}

function updateTripListArray(updatedTripObj) {
  const newTripObj = updatedTripObj.data;
  // const newTripListObj = tripListObject;
  // const tripList = newTripListObj.data;
  // for (let i = 0; i < tripList.length; i += 1) {
  //   if (tripList[i]._id === newTripObj._id) { // eslint-disable-line
  //     tripList[i] = newTripObj;
  //     break;
  //   }
  // }
  // newTripListObj.data = tripList;
  return (dispatch, getState) => {
    const newTripListObj = getState().trips.tripList;
    const tripList = newTripListObj.data;
    for (let i = 0; i < tripList.length; i += 1) {
      if (tripList[i]._id == newTripObj._id) {
        tripList[i] = newTripObj;
        break;
      }
    }
    newTripListObj.data = tripList;
    dispatch(updateTripList(newTripListObj));
  };
}

function updateTripObject(tripObj) {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(updatingTripObject());
    TripService.updateTripObject(token, tripObj)
      .then(response => {
        dispatch(updatingTripObjectSuccess());
        // const tripList = getState().trips.tripList;
        dispatch(updateTripListArray(response));
        dispatch(closeModal());
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(updatingTripObjectFailed());
      });
    // const tripList = getState().trips.tripList;
    // updateTripList(1, tripList);
  };
}

export default {openModal, closeModal, updateTripObject};
