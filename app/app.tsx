// Lib Imports
import * as React from 'react';
import { render } from 'react-dom';

// Local Imports
import { configureStore, history } from './store/RootStore';
import Root from './containers/Root';
import { initialState } from './reducers/RootReducer';

const store = configureStore(initialState);

// Render application
const app = document.getElementById('application');
render(<Root store={store} history={history} />, app);
