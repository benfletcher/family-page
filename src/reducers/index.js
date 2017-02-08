import { combineReducers } from 'redux';
import photos from './photos';
import status from './status';
import people from './people';

export default combineReducers({
  status,
  photos,
  people,
});
