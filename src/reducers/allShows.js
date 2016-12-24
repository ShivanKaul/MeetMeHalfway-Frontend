import {
  FETCH_ALL_SHOWS
} from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_ALL_SHOWS:
      const newPayload = action.payload;
      const newState = [...state, ...newPayload];

      return newState;
  }

  return state;
}