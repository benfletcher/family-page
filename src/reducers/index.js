import { combineReducers } from 'redux';
import messages from './messages';
import status from './status';
import members from './members';

export default combineReducers({
  status,
  messages,
  members,
});
