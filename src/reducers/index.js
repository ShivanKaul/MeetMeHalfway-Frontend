import { combineReducers } from 'redux';
import recommendedShowsReducer from './recommended';
import allShowsReducer from './allShows';
import loggedReducer from './logged';
import dialogMessageReducer from './dialogMessage';

const rootReducer = combineReducers({
  recommendedShows: recommendedShowsReducer,
  allShows: allShowsReducer,
  logged: loggedReducer,
  dialogMessage: dialogMessageReducer
});

export default rootReducer;
