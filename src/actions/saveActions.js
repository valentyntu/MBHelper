import {
  ADD_SAVE,
  CHOOSE_SAVE, CLOSE_CLOUD_MODAL,
  DELETE_SAVE,
  GET_ERRORS,
  GET_SAVES,
  LOAD_SAVE_OR_PRESET,
  OPEN_LOADING_MODAL,
  OPEN_SAVING_MODAL
} from './types';
import axios from 'axios';
import savesUrl from '../Workspace/Controls/Storage/Remote/savesURL';
import {prepareSaveOrPreset} from '../service/tableService';

export const loadSaves = (sub) => dispatch => {
  axios.get(`${savesUrl}?sub=${sub}`)
      .then(saves => {
        dispatch({
          type: GET_SAVES,
          payload: saves.data
        })
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.data
        })
      });
};

export const addSave = (save) => dispatch => {
  axios.post(savesUrl, save)
      .then(save => dispatch({
        type: ADD_SAVE,
        payload: save.data
      }))
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.data
        })
      });
};

export const deleteSave = (save) => dispatch => {
  axios.delete(`${savesUrl}/${save._id}`)
      .then(() => {
            dispatch({
              type: DELETE_SAVE,
              payload: save
            })
          }
      )
      .catch(err => {
        console.log();
        dispatch({
          type: GET_ERRORS,
          payload: err.data
        })
      });
};

export const chooseSave = (save) => {
  return ({
    type: CHOOSE_SAVE,
    payload: save
  })
};

export const loadSaveOrPreset = (saveOrPreset) => {
  let newTableState = prepareSaveOrPreset(saveOrPreset);
  return ({
    type: LOAD_SAVE_OR_PRESET,
    payload: newTableState
  })
};

export const openCloudSavingModal = () => {
  return ({
    type: OPEN_SAVING_MODAL,
    payload: {isUploading: false}
  })
};

export const openCloudLoadingModal = () => {
  return ({
    type: OPEN_LOADING_MODAL,
    payload: {isUploading: true}
  })
};

export const closeCloudModal = () => {
  return ({
    type: CLOSE_CLOUD_MODAL,
    payload: {}
  })
};