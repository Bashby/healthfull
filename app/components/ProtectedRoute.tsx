// Lib Imports
import * as React from 'react';
import * as History from 'history';
import { Route, Redirect, match } from "react-router";
import { Link } from "react-router-dom";

// Local Imports

interface PathParams {
	id: string;
}

interface Props {
	component: React.ComponentClass<any>;
	authenticated: boolean;
	path: string;
	innerProps?: any;
	computedMatch?: match<PathParams>;
	location?: History.Location;
};

interface State {
};


// ProtectedRoute Component
export class ProtectedRoute extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}
	
	render() {
		const Component = this.props.component;
		const match = this.props.computedMatch;

		return (
			<Route
				path={this.props.path}
				render={
					() => (
						this.props.authenticated ? (
							<Component {...this.props.innerProps} id={match.params.id} location={this.props.location} />
						) : (
							<Redirect to={{
								pathname: '/login',
								state: {
									from: match.url
								}
							}} />
						)
					)
				}
			/>
		);
	}
}


// const PrivateRoute = ({ component: Component, ...rest }) => (
// 	<Route {...rest} render={props => (
// 		fakeAuth.isAuthenticated ? (
// 			<Component {...props}/>
// 		) : (
// 			<Redirect to={{
// 				pathname: '/login',
// 				state: { from: props.location }
// 			}}/>
// 		)
// 	)}/>
// )