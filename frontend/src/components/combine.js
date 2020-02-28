import { combineReducers } from "redux";
//import { reducer as formReducer } from "redux-form";
import loginReducer from "../../src/js/reducers/loginReducer";
//import signUpReducer from "./signUpReducer";
// import editProfileReducer from "./EditProfileReducer";



const rootReducer = combineReducers({
  loginReducer: loginReducer,
//  signUpReducer: signUpReducer,
//   editProfileReducer: editProfileReducer,
  //form: formReducer
});

export default rootReducer;