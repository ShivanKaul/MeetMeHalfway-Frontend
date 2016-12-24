import {
  LOGIN,
  LOGOUT,
  REGISTER
} from '../actions/types';

export default function(state = false, action) {
  switch(action.type) {
    case LOGIN:
      return true;
    case LOGOUT:
      return false;
    case REGISTER:
      return true;

    default:
      return state;
  }


}