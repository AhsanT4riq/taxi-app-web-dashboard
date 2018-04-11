import {
  OPEN_USER_DETAILS_MODAL,
  CLOSE_USER_DETAILS_MODAL,
  UPDATING_USER_DETAILS_OBJECT,
  UPDATING_USER_DETAILS_OBJECT_SUCCESS,
  UPDATING_USER_DETAILS_OBJECT_FAILED
} from "./actionType";

import {UPDATE_USER_LIST_OBJECT} from "../users/actionType";

import userService from "../../../services/users";

export const openUserDetailModal = userObj => {
  return {
    type: OPEN_USER_DETAILS_MODAL,
    modalStatus: true,
    userObj
  };
};
export const closeUserDetailModal = () => {
  return {
    type: CLOSE_USER_DETAILS_MODAL,
    modalStatus: false
  };
};

function updatingUserObject() {
  return {
    type: UPDATING_USER_DETAILS_OBJECT
  };
}

function updatingUserObjectSuccess() {
  return {
    type: UPDATING_USER_DETAILS_OBJECT_SUCCESS
  };
}
function updatingUserObjectFailed() {
  return {
    type: UPDATING_USER_DETAILS_OBJECT_FAILED
  };
}

function updateUserList(userListObject) {
  return {
    type: UPDATE_USER_LIST_OBJECT,
    userList: userListObject
  };
}

function updateUserListArray(updatedUserObj) {
  const newUserObj = updatedUserObj.data;
  return (dispatch, getState) => {
    const newUserListObj = getState().users.userList;
    const userList = newUserListObj.data;
    for (let i = 0; i < userList.length; i += 1) {
      if (userList[i]._id == newUserObj._id) {
        userList[i] = newUserObj;
        break;
      }
    }
    newUserListObj.data = userList;
    dispatch(updateUserList(newUserListObj));
  };
}

export const updateUserObject = userObj => {
  return (dispatch, getState) => {
    const token = getState().auth.user.jwtAccessToken;
    dispatch(updatingUserObject());
    userService
      .updateUserDetails(token, userObj)
      .then(response => {
        dispatch(updatingUserObjectSuccess());
        dispatch(updateUserListArray(response));
        dispatch(closeUserDetailModal());
      })
      .catch(e => {
        if (e.message === "Unauthorized") {
          dispatch({type: "FLUSH_DATA"});
        }
        dispatch(updatingUserObjectFailed());
      });
  };
};
