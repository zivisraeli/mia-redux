import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App.js';
import { reducer } from './reducers/reducer.js';

// =============================================================================
// - The Redux store holds the state of the app.
// - Upon creating the store the reducer is called for the first time. 
//   This is how the state initial value is set!!!
// - Provider componet will take care passing down the 'store' to all compoenents 
//   instead of manually passing it down as a property.
// =============================================================================
const store = createStore(reducer);

ReactDOM.render((<Provider store={store}>
                   <App />
                 </Provider>), 
                document.getElementById('app'));
