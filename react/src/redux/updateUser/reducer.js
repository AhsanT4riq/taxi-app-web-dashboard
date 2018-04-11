import {
  OPEN_USER_DETAILS_MODAL,
  CLOSE_USER_DETAILS_MODAL,
  UPDATING_USER_DETAILS_OBJECT,
  UPDATING_USER_DETAILS_OBJECT_SUCCESS,
  UPDATING_USER_DETAILS_OBJECT_FAILED
} from "./actionType";

const initialState = {
  showUserupdateModal: false,
  userObjectToUpdate: {},
  errorOnUserObjectUpdate: false,
  updateUserObjectLoading: false
};

export const updateUser = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_USER_DETAILS_MODAL:
      return {
        ...state,
        showUserupdateModal: action.modalStatus,
        userObjectToUpdate: action.userObj
      };
    case CLOSE_USER_DETAILS_MODAL:
      return {
        ...state,
        showUserupdateModal: action.modalStatus,
        userObjectToUpdate: {}
      };
    case UPDATING_USER_DETAILS_OBJECT:
      return {...state, updateUserObjectLoading: true};
    case UPDATING_USER_DETAILS_OBJECT_SUCCESS:
      return {...state, updateUserObjectLoading: false};
    case UPDATING_USER_DETAILS_OBJECT_FAILED:
      return {
        ...state,
        updateUserObjectLoading: false,
        errorOnUserObjectUpdate: true
      };
    default:
      return {...state};
  }
};
