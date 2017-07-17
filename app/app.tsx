import React from 'react';
import { render } from 'react-dom';
import { configureStore, history } from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();

// Render application
const app = document.getElementById('application');
render(<Root store={store} history={history} />, app);
