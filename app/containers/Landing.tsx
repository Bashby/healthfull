// Lib Imports
import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

// Local Imports
import { IState } from '../reducers/Root';


// Interfaces
interface AllProps {
}

interface State {
}

interface MyStateProps {
}

interface MyDispatchProps {
}

interface MyOwnProps {
}

// Landing Component
class LandingComponent extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);
		this.state = {};
	}
	
	render() {
		return (
			<div>
				<span>Landing page</span>
				<Link to={"/recipes"}>Recipes</Link>
			</div>
		);
	}
}

function mapStateToProps(state: IState): MyStateProps {
	return {
	}
}

function mapDispatchToProps(dispatch: Dispatch<IState>): MyDispatchProps {
	return {
	}
}

export const LandingContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(LandingComponent);
