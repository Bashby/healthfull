// Lib Imports
import * as React from 'react';
import * as History from 'history';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from "react-router-redux";
import { Link } from "react-router-dom";

// Local Imports
import { RootActionCreators } from "../actions/Root";
import { IState } from '../reducers/Root';
import { LoginForm } from "../components/LoginForm";
import { ActionCreator } from "typescript-fsa/lib";


// Interfaces
interface AllProps extends MyStateProps, MyDispatchProps, MyOwnProps {}

interface State {
}

interface MyStateProps {
	authenticated: boolean
}

interface MyDispatchProps {
	changePage: (path: string) => void;
	updateAuthenticated: ActionCreator<boolean>;
}

interface MyOwnProps {
	location: History.Location
}

// Login Component
class LoginComponent extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);
		this.state = {};
	}
	
	// Extract referrer, if provided
	target = this.props.location.state && this.props.location.state.from;

	render() {
		return (
			<LoginForm
				authenticated={this.props.authenticated}
				target={this.target}
				changePage={this.props.changePage}
				updateAuthenticated={this.props.updateAuthenticated}
			/>
		);
	}
}

// Redux connectors
function mapStateToProps(state: IState): MyStateProps {
	return {
		authenticated: state.rootState.authenticated
	}
}

function mapDispatchToProps(dispatch: Dispatch<IState>): MyDispatchProps {
	return {
		changePage: (path: string) => {dispatch(push(path))},
		updateAuthenticated: bindActionCreators(RootActionCreators.updateAuthenticated, dispatch),
	}
}

// Connect
export const LoginContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(LoginComponent);
