import { combineReducers } from 'redux';
import photos from './photos';
import status from './status';
import members from './members';

export default combineReducers({
  status,
  photos,
  members,
});
