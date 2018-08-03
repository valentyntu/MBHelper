import {auth, getUserInfo, logout, setSession} from '../service/authService';

import {GET_ERRORS, LOG_IN, LOG_OUT} from './types';
import history from '../history';

export const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    return authenticateUser();
  }
};

const authenticateUser = () => dispatch => {
  auth.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult);
      getUserInfo(authResult.accessToken).then(user => {
        dispatch({
          type: LOG_IN,
          payload: user
        });
        localStorage.setItem('profile', JSON.stringify(user));
      });
    } else if (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    }
    history.replace('/workspace');
  });
};

export const loginUser = () => {
  auth.authorize();
};

export const logoutUser = () => {
  logout();
  return ({
    type: LOG_OUT,
    payload: {}
  })
};