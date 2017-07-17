import React from 'react';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';

import App from '../components/App';
import DevTools from './DevTools';

export default function Root({store, history}) {
    return (
        <Provider store={store}>
            <div>
                <ConnectedRouter history={history}>
                    <Route exact path="/" component={App}/>
                </ConnectedRouter>
                <DevTools />
            </div>
        </Provider>
    );
}