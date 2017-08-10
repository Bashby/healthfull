// Lib Imports
import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { History } from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
			<MuiThemeProvider>
				<Provider store={this.props.store}>
					<div>
						<ConnectedRouter history={this.props.history}>
							<RootContainer/>
						</ConnectedRouter>
						{isDev && <DevToolsContainer />}
					</div>
				</Provider>
			</MuiThemeProvider>
		);
	}
}
