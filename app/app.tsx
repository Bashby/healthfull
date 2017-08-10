// Lib Imports
import * as React from 'react';
import { render } from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

// Local Imports
import { configureStore, history } from './store/RootStore';
import { AppContainer } from './containers/App';
import { INITIAL_STATE } from './reducers/Root';

const store = configureStore(INITIAL_STATE);

// Resolve library dependencies
injectTapEventPlugin();

// Render application
const renderTarget = document.getElementById('application');
render(<AppContainer store={store} history={history} />, renderTarget);
