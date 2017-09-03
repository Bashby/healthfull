// Lib Imports
import * as React from 'react';
import { Route, Redirect } from "react-router";

// Local Imports


interface Props {
	component: React.ComponentClass<any>;
	authenticated: boolean;
	path: string;
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
		return (
			<Route
				path={this.props.path}
				render={
					() => (
						this.props.authenticated ? (
							<Component />
						) : (
							<Redirect to={{
								pathname: '/login',
								state: { from: this.props.path }
							}}/>
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