const USER_PROFILE_DETAILS = "USER_PROFILE_DETAILS";

const initialState = {
  id: null,
  fname: null,
  lname: null,
  phoneNo: null,
  email: null,
  userRating: null
};

export const userprofiledetails = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_DETAILS:
      return {
        id: action.userObject._id,
        fname: action.userObject.fname,
        lname: action.userObject.lname,
        phoneNo: action.userObject.phoneNo,
        email: action.userObject.email,
        userRating: action.userObject.userRating,
        profileUrl: action.userObject.profileUrl,
        deviceId: action.userObject.deviceId,
        pushToken: action.userObject.pushToken,
        licenceDetails: action.userObject.licenceDetails,
        licenceUrl: action.userObject.licenceUrl,
        bankDetails: action.userObject.bankDetails,
        emergencyDetails: action.userObject.emergencyDetails,
        carDetails: action.userObject.carDetails,
        vechilePaperUrl: action.userObject.vechilePaperUrl,
        insuranceUrl: action.userObject.insuranceUrl,
        rcBookUrl: action.userObject.rcBookUrl
      };
    default:
      return state;
  }
};
