import {
  ADD_SAVE,
  CHOOSE_SAVE,
  DELETE_SAVE,
  GET_SAVES,
  LOAD_SAVE_OR_PRESET,
  OPEN_LOADING_MODAL,
  OPEN_SAVING_MODAL
} from '../actions/types';

const initialState = {
  fromUser: [],
  toLoad: {},
  modal: {
    isUploading: false,
    isOpen: false
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SAVES:
      return {
        ...state,
        fromUser: action.payload
      };
    case ADD_SAVE:
      return {
        ...state,
        fromUser: [action.payload].concat(state.fromUser),
        modal: {
          isOpen: false
        }
      };
    case DELETE_SAVE:
      let index = state.fromUser
          .map(s => s._id)
          .indexOf(action.payload._id);
      let saves = state.fromUser;
      saves.splice(index, 1);
      return {
        ...state,
        fromUser: saves
      };
    case OPEN_LOADING_MODAL:
      return {
        ...state,
        modal: {
          isOpen: true,
          isUploading: false
        }
      };
    case OPEN_SAVING_MODAL: {
      return {
        ...state,
        modal: {
          isOpen: true,
          isUploading: true
        }
      }
    }
    case CHOOSE_SAVE: {
      return {
        ...state,
        toLoad: action.payload,
        modal: {
          isOpen: false
        }
      }
    }
    case LOAD_SAVE_OR_PRESET: {
      return {
        ...state,
        toLoad: action.payload
      }
    }
    default:
      return state;
  }
}