import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './Utils.js';

import App from './App.js'

ReactDOM.render((<Provider store={store}>
                   <App />
                 </Provider>), 
                document.getElementById('app'));
