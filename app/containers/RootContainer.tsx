// Lib Imports
import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { History } from 'history';

// Local Imports
import { RootComponent } from '../components/RootComponent';
import { IState } from '../reducers/RootReducer';
import { DevTools } from './DevTools';

interface Props {
	store: Store<IState>;
	history: History;
}

export function RootContainer(props: Props) {
	// Compute
	let isDev: boolean = process.env.NODE_ENV !== 'production';

	// Render
	return (
		<Provider store={props.store}>
			<div>
				<ConnectedRouter history={props.history}>
					<div>
						<Route exact path="/" component={RootComponent}/>
					</div>
				</ConnectedRouter>
				{isDev && <DevTools />}
			</div>
		</Provider>
	);
}