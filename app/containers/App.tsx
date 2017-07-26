// Lib Imports
import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { History } from 'history';

// Local Imports
import { RootContainer } from './Root';
import { IState } from '../reducers/Root';
import { DevToolsContainer } from './DevTools';

interface Props {
	store: Store<IState>;
	history: History;
}

interface State {

}

export class AppContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}
	
	render() {
		// Compute
		let isDev: boolean = process.env.NODE_ENV !== 'production';

		// Render
		return (
			<Provider store={this.props.store}>
				<div>
					<ConnectedRouter history={this.props.history}>
						<div>
							<Route exact path="/" component={RootContainer}/>
							<Route path="/foo" component={RootContainer}/>
						</div>
					</ConnectedRouter>
					{isDev && <DevToolsContainer />}
				</div>
			</Provider>
		);
	}
}
