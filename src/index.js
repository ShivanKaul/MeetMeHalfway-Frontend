import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
injectTapEventPlugin();

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.mycontainer'));
