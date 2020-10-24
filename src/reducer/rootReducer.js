import {combineReducers} from 'redux';
import {SignUpReducer} from '../Screens/Onboarding/SignUp/Reducer';
import {LoginReducer} from '../Screens/Onboarding/Login/Reducer';

export const rootReducer = combineReducers({
  SignUpReducer,
  LoginReducer,
});
