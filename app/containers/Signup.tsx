// Lib Imports
import * as React from 'react';
import * as History from 'history';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from "react-router-redux";
import { Link } from "react-router-dom";

// Local Imports
import { IState } from '../reducers/Root';
import { SignupForm } from "../components/SignupForm";

// Interfaces
interface AllProps extends MyStateProps, MyDispatchProps, MyOwnProps {}

interface State {
}

interface MyStateProps {
	authenticated: boolean
}

interface MyDispatchProps {
	changePage: (path: string) => void;
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
			<SignupForm authenticated={this.props.authenticated} target={this.target} changePage={this.props.changePage} />
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
		changePage: (path: string) => {dispatch(push(path))}
	}
}

// Connect
export const SignupContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(SignupComponent);
