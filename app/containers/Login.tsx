// Lib Imports
import * as React from 'react';
import * as History from 'history';
import { Dispatch, bindActionCreators } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { connect } from 'react-redux';
import { push } from "react-router-redux";
import { Link } from "react-router-dom";

// Local Imports
import { RootActionCreators } from "../actions/Root";
import { IState } from '../reducers/Root';
import { LoginForm } from "../components/LoginForm";
import { ActionCreator } from "typescript-fsa/lib";
import { ProfileActionCreators } from "../actions/Profile";
import { AuthenticationBasicParameter, AuthenticationActionCreators } from '../actions/Authentication';



// Interfaces
interface AllProps extends MyStateProps, MyDispatchProps, MyOwnProps {}

interface State {
}

interface MyStateProps {
	authenticated: boolean;
	username: string;
}

interface MyDispatchProps {
	changePage: (path: string) => void;
	updateAuthenticated: ActionCreator<boolean>;
	updateUsername: ActionCreator<string>;

	authenticate: (params: AuthenticationBasicParameter) => ThunkAction<Promise<{ success: boolean; }>, IState, any>;
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
				authenticate={this.props.authenticate}
				username={this.props.username}
				//updateUsername={this.props.updateUsername}
			/>
		);
	}
}

// Redux connectors
function mapStateToProps(state: IState): MyStateProps {
	return {
		authenticated: state.rootState.authenticated,
		username: state.profileState.username
	}
}

function mapDispatchToProps(dispatch: Dispatch<IState>): MyDispatchProps {
	return {
		changePage: (path: string) => {dispatch(push(path))},
		updateAuthenticated: bindActionCreators(RootActionCreators.updateAuthenticated, dispatch),
		updateUsername: bindActionCreators(ProfileActionCreators.updateUsername, dispatch),
		authenticate: bindActionCreators(AuthenticationActionCreators.authenticate, dispatch),
	}
}

// Connect
export const LoginContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(LoginComponent);
