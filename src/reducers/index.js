import { combineReducers } from 'redux';
import messages from './messages';
import status from './gallery';
import currentUser from './current-user';
import currentMembers from './members';
import family from './family';


export default combineReducers({
  status,
  messages,
  currentUser,
  currentMembers,
  family,
});
