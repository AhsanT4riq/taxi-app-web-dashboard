import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { auth } from "./auth/reducer";
import { trips } from "./trips/reducer";
import { configDetails } from "./appConfiguration/reducer";
import { tripDetails } from "./tripDetails/reducer";
import { users } from "./users/reducer";
import { userprofiledetails } from "./userProfile/reducer";
import { currentUser } from "./userDetails/reducer";
import { updateUser } from "./updateUser/reducer";
import { serverconfigDetails } from "./serverConfiguration/reducer";
const rootReducer = combineReducers({
  form: reduxFormReducer,
  auth,
  trips,
  configDetails,
  tripDetails,
  users,
  userprofiledetails,
  currentUser,
  updateUser,
  serverconfigDetails
});

export default rootReducer;
