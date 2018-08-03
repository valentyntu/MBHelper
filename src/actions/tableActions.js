import {UPDATE_TABLE_STATE} from './types';

export const updateTableState = (state) => {
  return ({
    type: UPDATE_TABLE_STATE,
    payload: state
  })
};