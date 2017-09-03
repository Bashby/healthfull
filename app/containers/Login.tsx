// Lib Imports
import * as React from 'react';
import * as History from 'history';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

// Local Imports
import { IState } from '../reducers/Root';
import { LoginForm } from "../components/LoginForm";

// Interfaces
interface AllProps {
	// State props
	authenticated: boolean

	// Own props
	location: History.Location
}

interface State {
}

interface MyStateProps {
	authenticated: boolean
}

interface MyDispatchProps {
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
	
	target = this.props.location.state && this.props.location.state.from;

	render() {
		return (
			<LoginForm authenticated={this.props.authenticated} target={this.target}/>
		);
	}
}

function mapStateToProps(state: IState): MyStateProps {
	return {
		authenticated: state.rootState.authenticated
	}
}

function mapDispatchToProps(dispatch: Dispatch<IState>): MyDispatchProps {
	return {
	}
}

export const LoginContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(LoginComponent);
