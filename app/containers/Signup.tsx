// Lib Imports
import * as React from 'react';
import * as History from 'history';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from "react-router-redux";
import { Link } from "react-router-dom";
import { ActionCreator } from "typescript-fsa/lib";

// Local Imports
import { IState } from '../reducers/Root';
import { SignupForm } from "../components/SignupForm";
import { RootActionCreators } from "../actions/Root";
import { ProfileActionCreators } from "../actions/Profile";


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
}

interface MyOwnProps {
	location: History.Location
}

// Signup Component
class SignupComponent extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);
		this.state = {};
	}
	
	// Extract referrer, if provided
	target = this.props.location.state && this.props.location.state.from;

	render() {
		return (
			<SignupForm
				authenticated={this.props.authenticated}
				target={this.target}
				changePage={this.props.changePage}
				updateAuthenticated={this.props.updateAuthenticated}
				username={this.props.username}
				updateUsername={this.props.updateUsername}
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
	}
}

// Connect
export const SignupContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(SignupComponent);
