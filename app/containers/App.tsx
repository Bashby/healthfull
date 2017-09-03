// Lib Imports
import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { History } from 'history';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Local Imports
import { RootContainer } from './Root';
import { IState } from '../reducers/Root';
import { DevToolsContainer } from './DevTools';
import { greenA700, green700, deepOrange500, tealA400, yellow500, lightBlue900 } from "material-ui/styles/colors";

interface Props {
	store: Store<IState>;
	history: History;
}

interface State {

}

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: greenA700, // was cyan500
		primary2Color: green700, // was cyan700
		// primary3Color: grey400,
		accent1Color: deepOrange500, // was pinkA200
		accent2Color: tealA400, // was grey100
		accent3Color: yellow500, // was grey500
		// textColor: darkBlack,
		// secondaryTextColor: fade(darkBlack, 0.54),
		// alternateTextColor: white,
		// canvasColor: white,
		// borderColor: grey300,
		// disabledColor: fade(darkBlack, 0.3),
		pickerHeaderColor: lightBlue900, // was cyan500
		// clockCircleColor: fade(darkBlack, 0.07),
		// shadowColor: fullBlack,
	}
});

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
			<MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
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
