import { combineReducers } from 'redux';
import messages from './messages';
import status from './gallery';
import members from './members';
import currentUser from './current-user';


export default combineReducers({
  status,
  messages,
  members,
  currentUser,
});
