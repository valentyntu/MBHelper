import {LOG_IN, LOG_OUT} from '../actions/types';
import {isAuthenticated, setAuthToken} from '../service/authService';

function init() {
  setAuthToken(localStorage.getItem('id_token'));
  return {
    user: localStorage.profile ? JSON.parse(localStorage.getItem('profile')) : {},
    isAuthenticated: isAuthenticated()
  }
}

const initialState = init();

export default function (state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload
      };
    default:
      return state;
  }
}