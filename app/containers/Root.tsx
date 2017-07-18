// Lib Imports
import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { History } from 'history';

// Local Imports
import App from '../components/App';
import { IState } from '../reducers/RootReducer';
import DevTools from './DevTools';

interface Props {
    store: Store<IState>;
    history: History;
}

export default function Root(props: Props) {
    // Compute
    let isDev: boolean = process.env.NODE_ENV === 'production';

    // Render
    return (
        <Provider store={props.store}>
            <ConnectedRouter history={props.history}>
                <div>
                    <Route exact path="/" component={App}/>
                </div>
            </ConnectedRouter>
            {isDev && <DevTools />}
        </Provider>
    );
}