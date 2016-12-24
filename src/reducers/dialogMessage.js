import {
  DIALOG_MSG
} from '../actions/types';

export default function(state = '', action) {
  console.log('action: ', action);
  switch(action.type) {
    case DIALOG_MSG:
      return action.payload;
  }

  return '';
}