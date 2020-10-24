import {all} from 'redux-saga/effects';
import SignUpSaga from '../Screens/Onboarding/SignUp/SignUpSaga';
import LoginSaga from '../Screens/Onboarding/Login/LoginSaga';

export default function* rootSaga() {
  yield all([SignUpSaga(), LoginSaga()]);
}
