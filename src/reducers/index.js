import {combineReducers} from 'redux';
import authReducers from './authReducer';
import savesReducers from './saveReducer'
import errorReducer from './errorReducer';
import tableReducer from './tableReducer';

export default combineReducers({
  auth: authReducers,
  saves: savesReducers,
  errors: errorReducer,
  table: tableReducer
})