import presets from '../Workspace/Controls/Presets/Presets';
import {UPDATE_TABLE_STATE} from '../actions/types';

const initialState = {
  initialState: presets[0]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_TABLE_STATE: {
      return {
        ...state,
        state: action.payload,
      }
    }
    default:
      return state;
  }
}