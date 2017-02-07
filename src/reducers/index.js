import * as actions from '../actions';
import { combineReducers } from 'redux'

const initialState = {
  messages: [],
  status: '',
  statusLoading: false
};

const statusReducer = (state = initialState, action) => {

  if (action.type === actions.GET_STATUS) {
    return {
      ...state,
      statusLoading: true
    };
  }

  else if (action.type === actions.GET_STATUS_SUCCESS) {
    return {
      ...state,
      status: action.message,
      statusLoading: false
    };
  }

  return state;
};

const photoReducer = (state = initialState, action) => {

  if (action.type === actions.GET_PHOTOS) {
    return {
      ...state,
      photosLoading: true
    };
  }

  else if (action.type === actions.GET_STATUS_SUCCESS) {
    return {
      ...state,
      photos: action.photos,
      statusLoading: false
    };
  }

  return state;
};

export default combineReducers({ 
  statusReducer,
  photoReducer
});  
