const USER_PROFILE_DETAILS = "USER_PROFILE_DETAILS";

function userprofiledetails(userObject) {
  return {
    type: USER_PROFILE_DETAILS,
    userObject
  };
}
export default { userprofiledetails };
