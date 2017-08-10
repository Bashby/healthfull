// Lib Imports
import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import SvgIconPlacesSpa from 'material-ui/svg-icons/places/spa';
// import { ActionCreator } from 'typescript-fsa';
// import { Link } from 'react-router-dom';
// import { push } from 'react-router-redux'

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

class RecipeComponent extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);
		this.state = {};
	}
	
	render() {
		return (
			<RaisedButton
				href="https://github.com/callemall/material-ui"
				target="_blank"
				label="Github Link"
				secondary={true}
				icon={<SvgIconPlacesSpa/>}
			/>
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

export const RecipeContainer = connect<MyStateProps, MyDispatchProps, MyOwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(RecipeComponent);
