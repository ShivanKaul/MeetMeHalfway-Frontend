import {
  FETCH_RECOMMENDED_SHOWS
} from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_RECOMMENDED_SHOWS:
      const newPayload = action.payload;
      const newState = [...state, ...newPayload];

      return newState;
  }

  return state;
}