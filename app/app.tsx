// Lib Imports
import * as React from 'react';
import { render } from 'react-dom';

// Local Imports
import { configureStore, history } from './store/RootStore';
import { RootContainer } from './containers/RootContainer';
import { initialState } from './reducers/RootReducer';

const store = configureStore(initialState);

// Render application
const renderTarget = document.getElementById('application');
render(<RootContainer store={store} history={history} />, renderTarget);
